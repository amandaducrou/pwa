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
	endpoint: "https://fcm.googleapis.com/fcm/send/fC6kFLbBV94:APA91bEIhd81xuX5ifl-BEtBWFpt-QUaHpB19K5VNDwC1I5pPRQi2KcXVIFtLBvLZTKp38sY8BuSBjINDTqK7ZAqOGlMRMnZEPmxM35g8RPScz0zmge0V6EXIZQoiOd5J6JTd8l9O7v4",
	keys: {
		auth: "jUd4BEmwWSBZJ8RvW2Un4w",
		p256dh: "BHzBcyOQoPN9KxaFqT5VvIo_dPS45E2HU8rsuM1N0o6I-y1tLsBrI1pTPEuf2jPubf1otG0qGgVHjI8YfqhQ6tA",
	}
};

webpush.sendNotification(pushSubscription, "A notification from the push server");
console.log("Push sent to client.");
