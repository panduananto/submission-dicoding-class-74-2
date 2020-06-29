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

      store.add(item);
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: `${team.name} berhasil ditambahkan ke daftar favorite` });
    })
    .catch(function (error) {
      console.log(error);
    });
}
