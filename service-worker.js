const CACHE_NAME = "football-v44";

let urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/standings.html",
  "/teams.html",
  "/pages/home.html",
  "/pages/favorites.html",
  "/js/api.js",
  "/js/idb.js",
  "/js/load-page-on-nav.js",
  "/js/materialize.min.js",
  "/js/register-service-worker.js",
  "/js/render.js",
  "/js/standings.js",
  "/js/teams.js",
  "/js/util.js",
  "/css/main.css",
  "/css/materialize.min.css",
  "/assets/icons/delete.svg",
  "/assets/icons/facebook-circled.svg",
  "/assets/icons/favorite.svg",
  "/assets/icons/github-circled.svg",
  "/assets/icons/instagrem.svg",
  "/assets/icons/mail.svg",
  "/assets/icons/icon-72x72.png",
  "/assets/icons/icon-96x96.png",
  "/assets/icons/icon-128x128.png",
  "/assets/icons/icon-144x144.png",
  "/assets/icons/icon-152x152.png",
  "/assets/icons/icon-192x192.png",
  "/assets/icons/icon-384x384.png",
  "/assets/icons/icon-512x512.png",
  "/assets/images/404.svg",
  "/assets/images/cannot_access.svg",
  "/assets/images/offline.svg",
  "/assets/images/team_no_crest.svg",
  "/assets/images/BL1.png",
  "/assets/images/BSA.png",
  "/assets/images/CL.png",
  "/assets/images/DED.png",
  "/assets/images/EC.png",
  "/assets/images/ELC.png",
  "/assets/images/FL1.png",
  "/assets/images/PD.png",
  "/assets/images/PL.png",
  "/assets/images/PPL.png",
  "/assets/images/SA.png",
  "/assets/images/header-background.jpg",
  "/assets/images/header-standing.jpg",
  "/assets/images/header-team.jpg",
  "/assets/images/team_img_not_found.jpg",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  const baseURL = "https://api.football-data.org/v2/";

  if (event.request.url.indexOf(baseURL) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function (response) {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cachesNames) {
      return Promise.all(
        cachesNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("serviceworker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
