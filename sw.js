const CACHE_NAME = 'edugrowth-essay-v1';
// Jo files offline chahiye unki list yahan hai
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './favicon.ico',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching assets for offline use');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetching assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar cache mein hai toh wahi se uthao, nahi toh network se
        return response || fetch(event.request);
      })
  );
});

// Purane cache ko delete karna
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
