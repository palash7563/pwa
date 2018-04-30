self.addEventListener("install", function(event) {
  console.log(`service worker ${event}`);
  event.waitUntil(
    caches.open("static").then(cache => {
      cache.add("./src/js/app.js");
      console.log(`Caching is done`);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log(`Service Worker is activated ${event}`);
  return true;
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(e => {
      if (e) {
        return e;
      } else {
        return fetch(event.request);
      }
    })
  );
});
