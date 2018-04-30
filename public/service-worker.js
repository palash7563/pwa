const staticCache = "static-v2";
const dynamicCache = "dynamic";

self.addEventListener("install", function(event) {
  console.log(`service worker ${event}`);
  event.waitUntil(
    caches.open(staticCache).then(cache => {
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
      console.log(`Pre-Caching is done`);
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log(`Service Worker is activated ${event}`);

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== staticCache && key !== dynamicCache) {
            console.log("Removing old cache" + key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return true;
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request)
          .then(function(res) {
            return caches.open(dynamicCache).then(function(cache) {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch(function(err) {
            if (err) {
              console.log(err);
            }
          });
      }
    })
  );
});
