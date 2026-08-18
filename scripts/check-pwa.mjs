import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = path.join(repoRoot, 'dist');
const basePath = '/fun-phone-web/';

async function requireFile(relativePath) {
  const filePath = path.join(distRoot, relativePath);
  const fileStats = await stat(filePath).catch(() => null);
  if (!fileStats?.isFile()) throw new Error(`Missing PWA artifact: ${relativePath}`);
  return filePath;
}

const manifestPath = await requireFile('site.webmanifest');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
if (manifest.id !== basePath || manifest.start_url !== basePath || manifest.scope !== basePath) {
  throw new Error('PWA manifest id, start_url, and scope must match the GitHub Pages base path.');
}

const icon = manifest.icons?.find((candidate) => candidate.sizes === '512x512');
if (!icon) throw new Error('PWA manifest requires an accurately sized 512x512 icon.');
const iconPath = await requireFile(icon.src.replace(basePath, ''));
const iconBuffer = await readFile(iconPath);
if (iconBuffer.readUInt32BE(16) !== 512 || iconBuffer.readUInt32BE(20) !== 512) {
  throw new Error('The declared 512x512 PWA icon has different intrinsic dimensions.');
}

const serviceWorker = await readFile(await requireFile('service-worker.js'), 'utf8');
for (const expectedAsset of ['index.html', 'features/index.html', 'privacy/index.html', 'faq/index.html']) {
  if (!serviceWorker.includes(expectedAsset)) {
    throw new Error(`Service worker does not precache ${expectedAsset}.`);
  }
}

const homeHtml = await readFile(await requireFile('index.html'), 'utf8');
if (!homeHtml.includes('service-worker.js') || !homeHtml.includes('serviceWorker.register')) {
  throw new Error('Home page does not register the generated service worker.');
}

console.log('PWA manifest, registration, icon, and offline route precache passed.');
