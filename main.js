
// Progressive Enhancement (SW supported)
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

//Notification support
if(window.Notification) {

    function showNotification() {
        let notificationOpts = {
            body: "Some notification information",
            icon: "/icon.png",
        }
        let n = new Notification("My New Notification", notificationOpts);

        n.onClick = () => {
            console.log("Notification Clicked");
        }
    }

    //manage permission
    if(Notification.permission === "granted") {
        showNotification();
    } else if(Notification.permission !== "denied") {
        Notification.requestPermission((permission) => {
            if(permission === "granted") {
                showNotification();
            }
        });
    }
}