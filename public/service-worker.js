// Simple static precache service worker for Fun Phone
const CACHE_NAME = 'funphone-static-v3';
// Base path for GitHub Pages
const BASE = '/fun-phone-web/';
const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'privacy/index.html',
  BASE + 'features/index.html',
  BASE + 'faq/index.html',
  BASE + 'site.webmanifest',
  BASE + 'assets/logo.png'
  // Add more assets here if needed
];
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});
