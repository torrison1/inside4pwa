var cacheName = 'hello-pwa';
var filesToCache = [
    './',
    './index.html',
    './pwa/pwa.js',
    './app_core/css/bootstrap.min.css',
    './app_core/css/core.css',
    './app_core/inside_front/menu_basis/files/css/demo.css',
    './app_core/inside_front/menu_basis/files/touch_sideswipe/touch-sideswipe.css',
    './app_core/inside_front/menu_basis/files/legitRipple/ripple.min.css',
    'https://fonts.googleapis.com/css?family=Ubuntu+Condensed',
    'https://kit.fontawesome.com/826a81e09f.js',
    'https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css',
    'https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css',

];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});