import { getCompetitions, getFavoriteTeam } from "./api.js";
import { pageNotFound, pageCannotAccess } from "./render.js";

document.addEventListener("DOMContentLoaded", function () {
  const sideNavElement = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNavElement);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status != 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".topnav a, .sidenav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              const sideNav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sideNav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  let page = window.location.hash.substr(1);
  if (!page) {
    page = "home";
  }

  loadPage(page);

  function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector("#body-content");
        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
          if (page === "home") {
            getCompetitions();
          } else if (page === "favorites") {
            getFavoriteTeam();
          }
        } else if (this.status === 404) {
          pageNotFound(content);
        } else {
          pageCannotAccess(content);
        }
      }
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
