function registerWorker(file) {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      registerServiceWorker(file);
      requestNotifPremission();
    });
  } else {
    console.log("serviceworker tidak didukung browser");
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

function registerServiceWorker(file) {
  return navigator.serviceWorker
    .register(`\\${file}`)
    .then(function (registration) {
      console.log("pendaftaran serviceworker berhasil");
      return registration;
    })
    .catch(function (error) {
      console.log("pendaftaran serviceworker gagal, error: ", error);
    });
}

function requestNotifPremission() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("fitur notifikasi tidak diijinkan");
        return;
      } else if (result === "default") {
        console.error("pengguna menutup dialog request premission");
        return;
      }

      if ("PushManager" in window) {
        navigator.serviceWorker.getRegistration().then(function (registration) {
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(
                "BAsCVfGAJraJMu3OjSDg56P2RBsR4k3tO-jQPXx1ZDoX7Nc3x0AR2nUmJNPw_JHrDxlmPEK0NrOshQebEKXCPYw"
              ),
            })
            .then(function (subscribe) {
              console.log(
                "Berhasil melakukan subscribe dengan endpoint: ",
                subscribe.endpoint
              );
              console.log(
                "Berhasil melakukan subscribe dengan p256dh key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("p256dh"))
                  )
                )
              );
              console.log(
                "Berhasil melakukan subscribe dengan auth key: ",
                btoa(
                  String.fromCharCode.apply(
                    null,
                    new Uint8Array(subscribe.getKey("auth"))
                  )
                )
              );
            })
            .catch(function (e) {
              console.error("Tidak dapat melakukan subscribe: ", e.message);
            });
        });
      }
    });
  }
}

export default registerWorker;
