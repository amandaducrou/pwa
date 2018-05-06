// Web-Push module
const webpush = require("web-push");
const vapid = require("./vapid.json");

// Configure keys
webpush.setVapidDetails(
	"mailto:amandaducrou@gmail.com",
	vapid.publicKey,
	vapid.privateKey
);

const pushSubscription = {
	endpoint: "https://fcm.googleapis.com/fcm/send/f1BhOu5hdO4:APA91bG-5EhpaJBHob0lYRxbWV3qSuEDEp5WSMTxXf07tHplhpWHEthXUmxKsSCNJcdeXJ3JOjttc_Y05Z6yp6rEe8L2HmJW-E7qeV5kbUzP-Wru44_Goeffk9hubU71D5TUU70_ugSB",
	keys: {
		auth: "iMeEcErpltP5Me4WkV64bQ",
		p256dh: "BLYpnTNcbaAsGm9O5ecj4eoQyzFGaKVO1FZHZ14Z9pstIkIN_z_YX2mUrfecdJl6FGpRPKjmx16MBhY6C-O8Mpg",
	}
};

webpush.sendNotification(pushSubscription, "A notification from the push server");
console.log("Push sent to client.");
