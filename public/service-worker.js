var cacheName = 'orcabreja';
var filesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/materialize.min.css',
    '/css/style.css',
    '/img/icon-48.png',
    '/img/icon-72.png',
    '/img/icon-96.png',
    '/img/icon-144.png',
    '/img/icon-192.png',
    '/img/icon-512.png',
    '/img/bubble-beer-glass-260.jpg',
    '/js/main.js',
    '/js/main.js.map',
    '/js/materialize.min.js',
    '/js/pwacompat.min.js',
    '/js/script.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];


self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});

