// Progressive Enhancement (SW supported)
if (navigator.serviceWorker) {


  // Helper function
  // function urlBase64ToUint8Array(base64String) {
  //   const padding = '='.repeat((4 - base64String.length % 4) % 4);
  //   const base64 = (base64String + padding)
  //     .replace(/\-/g, '+')
  //     .replace(/_/g, '/');

  //   const rawData = window.atob(base64);
  //   const outputArray = new Uint8Array(rawData.length);

  //   for (let i = 0; i < rawData.length; ++i) {
  //     outputArray[i] = rawData.charCodeAt(i);
  //   }
  //   return outputArray;
  // }

  // Register the SW
  navigator.serviceWorker.register("/sw.js").then(function(registration) {

    console.log("SW Registered");

    // best practice is to request from server
    // let pubKey = "BCyv-_yXc6FQvRG1rlHCtByM3W1F30t6aiWgYYnGd7yjxLcN5rhNaVFh1IWWr0gHhRHxWdYNUjlfiIfqEqKs6AI";

    // registration.pushManager.getSubscription().then((sub) => {

    //   //if subscription found, return
    //   if(sub) return sub;

    //   let applicationServerKey = urlBase64ToUint8Array(pubKey);
    //   // Subscribe
    //   return registration.pushManager.subscribe({userVisibleOnly: true, applicationServerKey});

    // }).then(sub => sub.toJSON())
    //   .catch(console.log);

  }).catch(console.log);

}

//Get camera feed
// fetch("camera_feed.html")
//   .then((res) => {
//     return res.text();
// }).then((html) => {
//     document.getElementById("camera").innerHTML = html;
// });

//Notification support
// if(window.Notification) {

//     function showNotification() {
//         let notificationOpts = {
//             body: "Some notification information",
//             icon: "/icon.png",
//         }
//         let n = new Notification("My New Notification", notificationOpts);

//         n.onClick = () => {
//             console.log("Notification Clicked");
//         }
//     }

//     //manage permission
//     if(Notification.permission === "granted") {
//         showNotification();
//     } else if(Notification.permission !== "denied") {
//         Notification.requestPermission((permission) => {
//             if(permission === "granted") {
//                 showNotification();
//             }
//         });
//     }
// }