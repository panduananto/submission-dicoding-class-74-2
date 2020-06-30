function registerServiceWorker() {
  return navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("pendaftaran serviceworker berhasil");
      return registration;
    })
    .catch(function (error) {
      console.log("pendaftaran serviceworker gagal, error: ", error);
    });
}

function requestNotifPremission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("fitur notifikasi tidak diijinkan");
    } else if (result === "default") {
      console.error("pengguna menutup dialog request premission");
      return;
    } else {
      console.log("fitur notifikasi diijinkan");
    }
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    registerServiceWorker();
  });
} else {
  console.log("serviceworker tidak didukung browser ini");
}

if ("Notification" in window) {
  requestNotifPremission();
} else {
  console.log("browser tidak mendukung fitur notifikasi");
}
