const webPush = require("web-push");

const vapidkeys = {
  publicKey:
    "BAsCVfGAJraJMu3OjSDg56P2RBsR4k3tO-jQPXx1ZDoX7Nc3x0AR2nUmJNPw_JHrDxlmPEK0NrOshQebEKXCPYw",
  privateKey: "yvIc-BAXm3_FODWh3o8PmR7xvRUTbOn223O4xrzXlBE",
};

webPush.setVapidDetails(
  "mailto:pandunih@gmail.com",
  vapidkeys.publicKey,
  vapidkeys.privateKey
);

const pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/cbZKQB4Waxw:APA91bHZzMUxQwypYe9z2AMDr1rZQw-E_aeYhfDxpb2GbxZymlQCSV6zg5QGKGuai64u_Y-lS9zav_wtH5cxc5hUEGtsj-ffYkNorL2LFtpR3KkofKHgLAl6b-DsRGM1xI3AQR8wSFxm",
  keys: {
    p256dh:
      "BNVYULIPUZFquRR096q/VHEQGAiRdMyw75KkKYR3gQcso6UxFQvv/2kzMYeBAtiz8crEtercjx5sUzO7DaaSKWU=",
    auth: "esc6hirfhas0um9tV9LErg==",
  },
};

const payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!!";

const options = {
  gcmAPIKey: "307910579934",
  TTL: 60,
};

webPush.sendNotification(pushSubscription, payload, options);
