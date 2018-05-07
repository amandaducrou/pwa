
// Service Worker
const pwaCache = "pwa-cache-1";

// Static assets to cache on install
const staticCache = [ "/", "index.html", "/placeholder.png", "/style.css", "/thumb.png", "/main.js" ];

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

  // Cache and network race with offline fallback
  let firstResponse = new Promise((resolve, reject) => {

      // Track rejections
      let firstRejectionReceived = false;
      let rejectOnce = () => {
      if(firstRejectionReceived) {
            console.log("HERE");
            if(e.request.url.match('thumb.png')) {
                console.log("HERE 2");
                resolve(caches.match("/placeholder.png"));
            } else {
                reject("No Response Received.");
            }
        } else {
            firstRejectionReceived = true;
        }
      };

        // Try Network
        fetch(e.request).then((res) => {
            // check res ok
            res.ok ? resolve(res) : rejectOnce();
        }).catch(rejectOnce);

        // Try Cache
        caches.match(e.request).then((res) => {
            // Check cache found
            res ? resolve(res) : rejectOnce();
        }).catch(rejectOnce);
  });
  e.respondWith(firstResponse);

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
