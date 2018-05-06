
// Service Worker
const pwaCache = "pwa-cache-2";

self.addEventListener("install", (e) => {

    let cacheReady = caches.open(pwaCache).then((cache) => {
        return cache.addAll([
            "/",
            "style.css",
            "thumb.png",
            "main.js"
        ]);
    });

    console.log("New cache ready.");
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

  // Skip for remote fetch
  if( !e.request.url.match(location.origin)) {
    return;
  }

  // Serve local fetch from cache

    let newRes = caches.open(pwaCache).then((cache) => {

        return cache.match(e.request).then((res) => {

            // Check request was found in cache
            if(res) {
                console.log(`Serving ${res.url} from cache`);
                return res;
            }

            // fetch on behalf of client and cache
            return fetch(e.request).then((fetchRes) => {
                cache.put(e.request, fetchRes.clone());
                return fetchRes;
            })
        });
    });

    e.respondWith(newRes);

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
