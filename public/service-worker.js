self.addEventListener("install", function(event) {
  console.log(`service worker ${event}`);
  event.waitUntil(
    caches.open("static").then(cache => {
      cache.addAll([
        "/",
        "./index.html",
        "./src/js/app.js",
        "./src/js/feed.js",
        "./src/js/material.min.js",
        "./src/css/app.css",
        "./src/css/feed.css",
        "./src/css/help.css",
        "./src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
      ]);
      // cache.add("/");
      // cache.add("./index.html");
      // cache.add("./src/js/app.js");
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
