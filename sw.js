
// Service Worker
self.addEventListener("fetch", (e) => {

  if (e.request.url.endsWith("/camera_feed.html")) {

    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if( res.ok ) return res;
          return new Response("Camera feed currently not available.")
        })
    )
  }
});

self.addEventListener("message", (e) => {

    // log message sent to service worker
    console.log(e.data);

    // reply to posting client
    self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
            if(e.source.id === client.id) {
                client.postMessage("Private Hello from Service Worker");
            }
        });
    });
});

self.addEventListener("push", (e) => {
    console.log("Push Received", e.message);
});
