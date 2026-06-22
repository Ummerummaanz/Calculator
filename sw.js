const CACHE_NAME = 'calculator-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json'
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())
        ))
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request).then(cached => {
            return cached || fetch(evt.request).then(response => {
                return response;
            });
        })
    );
});