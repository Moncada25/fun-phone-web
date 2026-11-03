import { createReadStream } from 'node:fs';
import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from 'chrome-launcher';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv[2] || path.join(repo, '../fun-phone/screenshots/store-v2'));
const campaign = JSON.parse(await readFile(path.join(source, 'campaign.json'), 'utf8'));
const webAssets = path.join(repo, 'public/assets/store-v2');
const studio = (await readFile(path.join(repo, 'tools/store-mockups/studio.html'), 'utf8')).replace('CAMPAIGN_DATA', JSON.stringify(campaign).replaceAll('<', '\\u003c'));
const fonts = {
  '/fonts/display.woff2': path.join(repo, 'node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2'),
  '/fonts/mono.woff2': path.join(repo, 'node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'),
};
for (const lang of campaign.export.locales) {
  for (const slide of campaign.slides) {
    await stat(path.join(source, 'raw', lang, `${slide.scene}.png`));
    if (slide.paired) await stat(path.join(source, 'raw', lang, `${slide.paired}.png`));
  }
  await mkdir(path.join(source, lang), { recursive: true });
  await mkdir(path.join(webAssets, lang), { recursive: true });
}
const server = createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  if (pathname === '/overview') {
    const lang = url.searchParams.get('lang') === 'en' ? 'en' : 'es';
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(overview(lang));
    return;
  }
  if (pathname === '/') { response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }).end(studio); return; }
  const candidate = fonts[pathname] || path.resolve(source, `.${pathname}`);
  if (!fonts[pathname] && !candidate.startsWith(source + path.sep)) { response.writeHead(403).end(); return; }
  if (!(await stat(candidate).catch(() => null))?.isFile()) { response.writeHead(404).end(); return; }
  const mime = pathname.endsWith('.woff2') ? 'font/woff2' : pathname.endsWith('.jpg') ? 'image/jpeg' : 'image/png';
  response.writeHead(200, { 'Content-Type': mime });
  createReadStream(candidate).pipe(response);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
if (!address || typeof address === 'string') throw new Error('Studio server did not bind a TCP port.');
const origin = `http://127.0.0.1:${address.port}`;
const chrome = await launch({ chromeFlags: ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage'] });
const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` });
const exported = [];
try {
  const page = await browser.newPage();
  for (const lang of campaign.export.locales) {
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    for (const [index, slide] of campaign.slides.entries()) {
      await page.goto(`${origin}/?slide=${index}&lang=${lang}`, { waitUntil: 'networkidle0' });
      await page.evaluate(() => window.STORE_READY);
      const bounds = await page.evaluate(() => {
        const h = document.querySelector('.copy h1');
        const text = document.querySelector('.copy');
        return { overflow: h.scrollWidth > h.clientWidth, textBottom: text.getBoundingClientRect().bottom };
      });
      if (bounds.overflow || bounds.textBottom > 384) throw new Error(`Headline exceeds the 20% safe area: ${lang}/${slide.id}`);
      const master = path.join(source, lang, `${slide.id}.jpg`);
      await page.screenshot({ path: master, type: 'jpeg', quality: 98 });
      const output = path.join(webAssets, lang, `${slide.id}.webp`);
      await sharp(master).webp({ quality: 91, effort: 6 }).toFile(output);
      exported.push({ id: slide.id, lang, bytes: (await stat(output)).size });
      console.log(`Exported ${lang}/${slide.id}`);
    }
    await page.setViewport({ width: 1024, height: 500, deviceScaleFactor: 1 });
    await page.goto(`${origin}/?feature=1&lang=${lang}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => window.STORE_READY);
    const graphic = path.join(source, lang, 'feature-graphic.jpg');
    await page.screenshot({ path: graphic, type: 'jpeg', quality: 98 });
    await copyFile(graphic, path.join(webAssets, lang, 'feature-graphic.jpg'));
    await sharp(graphic).webp({ quality: 92, effort: 6 }).toFile(path.join(webAssets, lang, 'feature-graphic.webp'));
    // Small authentic UI assets let the web hero show the app without nesting an old marketing poster.
    await mkdir(path.join(webAssets, 'ui', lang), { recursive: true });
    for (const scene of ['favorites', 'contacts', 'tools', 'settings', 'settings-dark']) {
      await sharp(path.join(source, 'raw', lang, `${scene}.png`)).webp({ quality: 92, effort: 6 }).toFile(path.join(webAssets, 'ui', lang, `${scene}.webp`));
    }
  }
  await writeFile(path.join(repo, 'src/data/store-screenshots.json'), JSON.stringify(campaign.slides, null, 2)+'\n');
  await writeFile(path.join(source, 'export-report.json'), JSON.stringify({ size: [1080,1920], alpha: false, assets: exported }, null, 2)+'\n');
  for (const lang of campaign.export.locales) {
    await page.setViewport({ width: 1280, height: 1240, deviceScaleFactor: 1 });
    await page.goto(`${origin}/overview?lang=${lang}`, { waitUntil: 'load' });
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(image => image.decode())); });
    await page.screenshot({ path: path.join(source, `overview-${lang}.jpg`), type: 'jpeg', quality: 95, fullPage: true });
  }
} finally {
  await browser.disconnect();
  chrome.kill();
  await new Promise(resolve => server.close(resolve));
}
console.log('Store JPEG masters and matching ES/EN web assets exported.');

function overview(lang) {
  return `<!doctype html><html lang="${lang}"><style>
      @font-face{font-family:Display;src:url('${origin}/fonts/display.woff2')}
      *{box-sizing:border-box}body{margin:0;padding:36px;background:#eeeae3;color:#191919;font-family:Display,sans-serif}
      header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:24px}
      h1{font-size:34px;letter-spacing:-1.4px;margin:0}header span{font-size:14px}
      main{display:grid;grid-template-columns:repeat(4,1fr);gap:24px 20px}
      figure{margin:0}img{display:block;width:100%;aspect-ratio:9/16;border-radius:12px;box-shadow:0 8px 22px #19191916}
      figcaption{font-size:15px;padding-top:8px}
    </style><header><h1>Fun Phone / ${lang === 'es' ? 'Tu teléfono. A tu manera.' : 'Your phone. Your way.'}</h1><span>${lang.toUpperCase()} · 1080 × 1920</span></header>
    <main>${campaign.slides.map((slide, index) => `<figure><img src="${origin}/${lang}/${slide.id}.jpg" alt="${slide.label[lang]}"><figcaption>${String(index + 1).padStart(2, '0')} / ${slide.label[lang]}</figcaption></figure>`).join('')}</main></html>`;
}
