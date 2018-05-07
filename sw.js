
// Service Worker
const pwaCache = "pwa-cache-2";

// Static assets to cache on install
const staticCache = [ "/", "index.html", "page2.html", "/placeholder.png", "/style.css", "/thumb.png", "/main.js" ];

// SW install and cache static assets
self.addEventListener("install", (e) => {

    let cacheReady = caches.open(pwaCache).then((cache) => {
        return cache.addAll(staticCache);
    });

    e.waitUntil(cacheReady);
});

self.addEventListener("activate", (e) => {

    let cacheCleaned = caches.keys().then((keys) => {
        keys.forEach((key) => {
            if(key !== pwaCache) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil(cacheCleaned);
});

self.addEventListener("fetch", (e) => {

  // Cache with Network Fallback
  let res = caches.match(e.request).then((res) => {
    // Check cache has response
    if(res) return res;

    // Fallback to Network
    return fetch(e.request).then((fetchRes) => {

        // Cache fetched response
        caches.open(pwaCache).then((cache) => {
           cache.put(e.request, fetchRes);
        });

        // Return clone of fetched response
        return fetchRes.clone();
    });
  });
      
  // Respond
  e.respondWith(res);

  // if (e.request.url.endsWith("/camera_feed.html")) {

  //   e.respondWith(
  //     fetch(e.request)
  //       .then((res) => {
  //         if( res.ok ) return res;
  //         return new Response("Camera feed currently not available.")
  //       })
  //   )
  // }

});

self.addEventListener("push", (e) => {
    let n = self.registration.showNotification("A notification from the SW");
    e.waitUntil(n);
});
