import { createReadStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const reportRoot = path.join(repoRoot, '.lighthouse-reports', new Date().toISOString().replaceAll(':', '-'));
const basePath = '/fun-phone-web/';
const routes = ['', 'features/', 'privacy/', 'faq/'];
const categoryBudgets = {
  performance: 0.9,
  accessibility: 0.95,
  'best-practices': 0.9,
  seo: 0.95,
};
const metricBudgets = {
  'largest-contentful-paint': 2_500,
  'cumulative-layout-shift': 0.1,
  'total-blocking-time': 200,
};
const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

async function resolveStaticFile(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split('?')[0]);
  if (!decodedPath.startsWith(basePath)) return null;
  const relativePath = decodedPath.slice(basePath.length);
  let filePath = path.resolve(distRoot, relativePath);
  if (filePath !== distRoot && !filePath.startsWith(distRoot + path.sep)) return null;
  const fileStats = await stat(filePath).catch(() => null);
  if (fileStats?.isDirectory()) filePath = path.join(filePath, 'index.html');
  const resolvedStats = await stat(filePath).catch(() => null);
  return resolvedStats?.isFile() ? filePath : null;
}

const server = createServer(async (request, response) => {
  const filePath = await resolveStaticFile(request.url || '/');
  if (!filePath) {
    response.writeHead(404).end('Not found');
    return;
  }
  const extension = path.extname(filePath);
  // GitHub Pages serves text assets compressed; measure the same transfer behavior locally.
  const gzip = request.headers['accept-encoding']?.includes('gzip')
    && ['.html', '.css', '.js', '.xml', '.webmanifest'].includes(extension);
  response.writeHead(200, {
    'Content-Type': mimeTypes[extension] || 'application/octet-stream',
    ...(gzip ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}),
  });
  const stream = createReadStream(filePath);
  if (gzip) stream.pipe(createGzip()).pipe(response);
  else stream.pipe(response);
});

await mkdir(reportRoot, { recursive: true });
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const serverPort = typeof address === 'object' && address ? address.port : 0;
const chrome = await launch({
  chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'],
});

try {
  for (const route of routes) {
    const url = `http://127.0.0.1:${serverPort}${basePath}${route}`;
    const samples = [];
    for (let run = 0; run < 3; run++) {
      const result = await lighthouse(url, {
        port: chrome.port,
        logLevel: 'error',
        output: ['json', 'html'],
        onlyCategories: Object.keys(categoryBudgets),
      });
      if (!result) throw new Error(`Lighthouse returned no result for ${route || 'home'}.`);
      if (!Array.isArray(result.report)) throw new Error('Lighthouse did not return both JSON and HTML reports.');
      const reportName = `${route.replaceAll('/', '') || 'home'}-${run + 1}`;
      await Promise.all([
        writeFile(path.join(reportRoot, `${reportName}.json`), result.report[0]),
        writeFile(path.join(reportRoot, `${reportName}.html`), result.report[1]),
      ]);
      samples.push(result.lhr);
    }
    const median = (values) => [...values].sort((a, b) => a - b)[1];
    const representative = [...samples].sort((a, b) => a.audits['largest-contentful-paint'].numericValue - b.audits['largest-contentful-paint'].numericValue)[1];
    const failures = [];
    for (const [category, minimumScore] of Object.entries(categoryBudgets)) {
      const score = median(samples.map((sample) => sample.categories[category]?.score ?? 0));
      if (score < minimumScore) {
        failures.push(`${category} ${score.toFixed(2)} < ${minimumScore.toFixed(2)}`);
      }
    }
    for (const [metric, maximumValue] of Object.entries(metricBudgets)) {
      const value = median(samples.map((sample) => sample.audits[metric]?.numericValue ?? Number.POSITIVE_INFINITY));
      if (value > maximumValue) {
        failures.push(`${metric} ${value.toFixed(3)} > ${maximumValue}`);
      }
    }
    if (samples.some((sample) => sample.audits['color-contrast']?.score === 0)) failures.push('color-contrast audit failed');

    const scores = Object.entries(categoryBudgets)
      .map(([category]) => `${category}=${median(samples.map((sample) => sample.categories[category].score)).toFixed(2)}`)
      .join(' ');
    console.log(`${route || 'home'} (median of 3): ${scores} LCP=${median(samples.map((sample) => sample.audits['largest-contentful-paint'].numericValue)).toFixed(0)}ms CLS=${median(samples.map((sample) => sample.audits['cumulative-layout-shift'].numericValue)).toFixed(3)} TBT=${median(samples.map((sample) => sample.audits['total-blocking-time'].numericValue)).toFixed(0)}ms`);

    if (failures.length > 0) {
      console.error('LCP diagnostics:', JSON.stringify(samples.map((sample) => ({
        lcp: sample.audits['largest-contentful-paint'].numericValue,
        fcp: sample.audits['first-contentful-paint'].numericValue,
        details: sample.audits['lcp-breakdown-insight']?.details,
      })), null, 2));
      console.error(`Full Lighthouse reports: ${path.relative(repoRoot, reportRoot)}`);
      const accessibilityFailures = Object.values(representative.audits)
        .filter((audit) =>
          audit.scoreDisplayMode === 'binary'
          && audit.score !== null
          && audit.score < 1
          && audit.details?.type === 'table',
        )
        .map((audit) => ({
          id: audit.id,
          title: audit.title,
          items: audit.details.items?.slice(0, 5),
        }));
      if (accessibilityFailures.length > 0) {
        console.error(
          `Accessibility findings for ${route || 'home'}:`,
          JSON.stringify(accessibilityFailures, null, 2),
        );
      }
      const layoutShiftItems = representative.audits['layout-shifts']?.details?.items;
      if (Array.isArray(layoutShiftItems) && layoutShiftItems.length > 0) {
        console.error(
          `Largest layout shifts for ${route || 'home'}:`,
          JSON.stringify(layoutShiftItems.slice(0, 3), null, 2),
        );
      }
      throw new Error(`${route || 'home'} failed Lighthouse budgets: ${failures.join(', ')}`);
    }
  }
} finally {
  await chrome.kill();
  await new Promise((resolve) => server.close(resolve));
}

console.log('Lighthouse category and Web Vitals budgets passed.');
console.log(`Reports saved to ${path.relative(repoRoot, reportRoot)}.`);
