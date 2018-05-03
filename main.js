
// Progressive Enhancement (SW supported)
// if ("serviceWorker" in navigator) {
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register("/sw.js").then(function(registration) {

    console.log("SW Registered");

    if(registration.active){
        registration.active.postMessage("Hello from main.js");
    }
  }).catch(console.log);

  // print messages sent to this client
  navigator.serviceWorker.addEventListener("message", (e) => {
    console.log(e.data);
  });
}

// Get camera feed
fetch("camera_feed.html")
  .then((res) => {
  return res.text();
}).then((html) => {
  document.getElementById("camera").innerHTML = html;
});
