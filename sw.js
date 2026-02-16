const CACHE_NAME = 'writing-guide-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './1000047883-removebg-preview.png',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Lora:ital,wght@0,400;0,700;1,400&display=swap'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch events (Offline support)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
