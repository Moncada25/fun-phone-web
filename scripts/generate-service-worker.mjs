import { readdir } from 'node:fs/promises';
import { generateSW } from 'workbox-build';

const legacyPngs = (await readdir('dist/assets/screenshots'))
  .filter((name) => name.endsWith('.png') && !name.endsWith('-upgrade.png'))
  .map((name) => `assets/screenshots/${name}`);

const { count, size, warnings } = await generateSW({
  cacheId: 'fun-phone-web',
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  directoryIndex: 'index.html',
  globDirectory: 'dist',
  globIgnores: [
    ...legacyPngs,
    'service-worker.js',
  ],
  globPatterns: [
    '**/*.{html,css,js,webmanifest,webp,svg,woff2,png}',
    'licenses/*.txt',
  ],
  inlineWorkboxRuntime: true,
  maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
  mode: 'production',
  skipWaiting: true,
  sourcemap: false,
  swDest: 'dist/service-worker.js',
});

for (const warning of warnings) console.warn(warning);
console.log(`PWA service worker generated: ${count} files, ${size} bytes precached.`);
