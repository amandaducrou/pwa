
// Service Worker
self.addEventListener('fetch', (e) => {

  if (e.request.url.endsWith('/camera_feed.html')) {

    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if( res.ok ) return res;
          return new Response('Camera feed currently not available.')
        })
    )
  }
});
