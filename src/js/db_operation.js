import idb from 'idb';

const dbPromised = idb.open("football", 1, function (upgradeDb) {
  let teamsObjectStore = upgradeDb.createObjectStore("teams_favorite", {
    keyPath: "id",
  });

  teamsObjectStore.createIndex("name", "name", { unique: false });
});

function addTeamToFavorite(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams_favorite", "readwrite");
      const store = tx.objectStore("teams_favorite");
      let item = {
        id: team.id,
        name: team.name,
        crestUrl: team.crestUrl,
      };

      store.put(item);
      return tx.complete;
    })
    .then(function () {
      let message = `${team.name} berhasil ditambahkan ke daftar favorite`;
      M.toast({ html: message });
      showNotification(message);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getAllFavoriteTeam() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams_favorite", "readonly");
        const store = tx.objectStore("teams_favorite");

        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function checkIfTeamIsFavorite(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams_favorite", "readonly");
        const store = tx.objectStore("teams_favorite");

        return store.get(id);
      })
      .then(function (data) {
        if (data != undefined || data != null) {
          resolve(true);
        } else {
          reject(false);
        }
      });
  });
}

function deleteTeamFromFavorite(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams_favorite", "readwrite");
      const store = tx.objectStore("teams_favorite");

      store.delete(team.id);
      return tx.complete;
    })
    .then(function () {
      let message = `${team.name} berhasil dihapus dari daftar favorite`;
      M.toast({ html: message });
      showNotification(message);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showNotification(message) {
  const title = "Soccer 101";
  const options = {
    body: message,
    icon: "/icons/icon-512x512.png",
    badge: "/icons/icon-512x512.png",
  };

  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("fitur notifikasi tidak diijinkan");
  }
}

export {
  addTeamToFavorite,
  getAllFavoriteTeam,
  checkIfTeamIsFavorite,
  deleteTeamFromFavorite,
};
