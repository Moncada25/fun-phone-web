// Simple static precache service worker for Fun Phone
const CACHE_NAME = 'funphone-static-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/privacy/index.html',
  '/features/index.html',
  '/faq/index.html',
  '/site.webmanifest',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/logo.svg',
  // Agrega aquí más assets si es necesario
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
