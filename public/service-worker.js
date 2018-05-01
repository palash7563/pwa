let staticCache = "static-v2";
let dynamicCache = "dynamic";

self.addEventListener("install", function(event) {
  //here App shell is cache while installing the service worker
  console.log(`service worker ${event}`);
  event.waitUntil(
    caches.open(staticCache).then(cache => {
      cache.addAll([
        "/",
        "./index.html",
        "./offline.html",
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
            caches.open(staticCache).then(function(cache) {
              return cache.match("./offline.html");
            });
          });
      }
    })
  );
});

// For caching only

// self.addEventListener('fetch',function(event){
//   event.respondWith(
//     caches.match(event.request)
//   );
// })

// For Networking only

// self.addEventListener('fetch',function(event){
//   event.respondWith(
//     fetch(event.request)
//   )
// });

// Strategy - first network if fails then cache

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     fetch(event.request)
//       .then(function(event) {
//         return caches.open(dynamicCache).then(function(cache) {
//           cache.put(event.request.url, res.clone());
//           return res;
//         });
//       })
//       .catch(function(err) {
//         return caches.match(event.request);
//       })
//   );
// });
