import { generateSW } from 'workbox-build';

const { count, size, warnings } = await generateSW({
  cacheId: 'fun-phone-web',
  cleanupOutdatedCaches: true,
  clientsClaim: true,
  directoryIndex: 'index.html',
  globDirectory: 'dist',
  globIgnores: [
    'assets/screenshots/*.png',
    'service-worker.js',
  ],
  globPatterns: [
    '**/*.{html,css,js,webmanifest,webp,svg}',
    'assets/logo.png',
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
