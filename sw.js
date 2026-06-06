const CACHE = 'alghaithi-pro-v1';
const ASSETS = [
  '/alghaithi-pro-releases/',
  '/alghaithi-pro-releases/index.html',
  '/alghaithi-pro-releases/manifest.json',
  '/alghaithi-pro-releases/icon-192.png',
  '/alghaithi-pro-releases/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.url.endsWith('.apk')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
