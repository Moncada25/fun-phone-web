import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const siteUrl = 'https://moncada25.github.io/fun-phone-web/';
const pages = new Map([
  ['index.html', siteUrl],
  ['features/index.html', `${siteUrl}features/`],
  ['privacy/index.html', `${siteUrl}privacy/`],
  ['faq/index.html', `${siteUrl}faq/`],
]);

function requireMatch(html, pattern, message) {
  const match = html.match(pattern);
  if (!match) throw new Error(message);
  return match[1];
}

for (const [relativePath, expectedCanonical] of pages) {
  const html = await readFile(path.join(distRoot, relativePath), 'utf8');
  const canonical = requireMatch(
    html,
    /<link rel="canonical" href="([^"]+)"/,
    `${relativePath} is missing a canonical URL.`,
  );
  if (canonical !== expectedCanonical) {
    throw new Error(`${relativePath} canonical is ${canonical}, expected ${expectedCanonical}.`);
  }

  const ogUrl = requireMatch(
    html,
    /<meta property="og:url" content="([^"]+)"/,
    `${relativePath} is missing og:url.`,
  );
  if (ogUrl !== canonical) {
    throw new Error(`${relativePath} og:url does not match its canonical URL.`);
  }

  for (const pattern of [
    /<meta property="og:image" content="([^"]+)"/,
    /<meta name="twitter:image" content="([^"]+)"/,
  ]) {
    const imageUrl = requireMatch(html, pattern, `${relativePath} is missing a social image.`);
    if (!imageUrl.startsWith(siteUrl)) {
      throw new Error(`${relativePath} social image must be an absolute production URL.`);
    }
  }
  requireMatch(html, /<title>([^<]+)<\/title>/, `${relativePath} is missing a title.`);
  requireMatch(
    html,
    /<meta name="description" content="([^"]+)"/,
    `${relativePath} is missing a description.`,
  );
}

const homeHtml = await readFile(path.join(distRoot, 'index.html'), 'utf8');
if (!homeHtml.includes('"@type":"MobileApplication"')) {
  throw new Error('Home page is missing MobileApplication structured data.');
}
const faqHtml = await readFile(path.join(distRoot, 'faq/index.html'), 'utf8');
if (!faqHtml.includes('"@type":"FAQPage"')) {
  throw new Error('FAQ page is missing FAQPage structured data.');
}

const hrefs = [...homeHtml.matchAll(/href="([^"]*play\.google\.com[^"]*)"/g)]
  .map((match) => match[1].replaceAll('&amp;', '&').replaceAll('&#38;', '&'));
if (hrefs.length < 2) {
  throw new Error('Home page must expose attributed hero and final Play CTAs.');
}
for (const href of hrefs) {
  const referrer = new URL(href).searchParams.get('referrer');
  if (!referrer) throw new Error('Every rendered Play CTA must include an install referrer.');
  const attribution = new URLSearchParams(referrer);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    if (!attribution.get(key)) {
      throw new Error(`Play CTA install referrer is missing ${key}.`);
    }
  }
}

const sitemap = await readFile(path.join(distRoot, 'sitemap.xml'), 'utf8');
for (const expectedUrl of pages.values()) {
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) {
    throw new Error(`Sitemap is missing ${expectedUrl}.`);
  }
}
const robots = await readFile(path.join(distRoot, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${siteUrl}sitemap.xml`)) {
  throw new Error('robots.txt does not reference the production sitemap.');
}

console.log('Discovery metadata and install-attribution guard passed.');
