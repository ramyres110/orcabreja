var cacheName = 'orcabreja';
var filesToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/database.json',
    '/css/materialize.min.css',
    '/css/style.css',
    '/img/icon-48.png',
    '/img/icon-72.png',
    '/img/icon-96.png',
    '/img/icon-144.png',
    '/img/icon-192.png',
    '/img/icon-512.png',
    '/img/bubble-beer-glass-260.jpg',
    '/img/brands/amstel.jpg',
    '/img/brands/antarctica.jpg',
    '/img/brands/bavaria.jpg',
    '/img/brands/bohemia.jpg',
    '/img/brands/brahma.jpg',
    '/img/brands/budweiser.jpg',
    '/img/brands/bud_light.jpg',
    '/img/brands/default.jpg',
    '/img/brands/heineken.jpg',
    '/img/brands/kokanee.jpg',
    '/img/brands/michelob_ultra.jpg',
    '/img/brands/skol.jpg',
    '/img/brands/sol.jpg',
    '/img/brands/stella_artois.jpg',
    '/js/main.js',
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

