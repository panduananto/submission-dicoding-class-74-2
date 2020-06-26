document.addEventListener("DOMContentLoaded", function () {
  const sideNavElement = document.querySelectorAll(".sidenav");
  M.Sidenav.init(sideNavElement);
  loadNav();

  const navElement = document.querySelector(".nav-custom");
  window.onscroll = () => {
    let top = window.scrollY;
    if (top >= 4) {
      navElement.classList.add("black", "sticky-nav");
    } else {
      navElement.classList.remove("black", "sticky-nav");
    }
  };

  function cardToVertical() {
    const cardHorizontalElement = document.querySelectorAll(
      ".card-horizontal-container"
    );
    const cardStackedElement = document.querySelectorAll(
      ".card-stacked-container"
    );
    window.onresize = () => {
      let windowWidth = window.innerWidth;
      console.log(windowWidth);
      if (windowWidth <= 682) {
        cardHorizontalElement.forEach((item) => {
          item.classList.remove("horizontal");
        });
        cardStackedElement.forEach((item) => {
          item.classList.remove("card-stacked");
        });
      } else if (windowWidth > 682) {
        cardHorizontalElement.forEach((item) => {
          item.classList.add("horizontal");
        });
        cardStackedElement.forEach((item) => {
          item.classList.add("card-stacked");
        });
      }
    };
  }

  function trimText() {
    let excerpt = document.querySelectorAll(".excerpt");

    excerpt.forEach((element) => {
      let excerptText = element.innerText;
      if (excerptText.length > 100) {
        let trimmedText = `${excerptText.substr(0, 120)}...`;
        element.innerHTML = trimmedText;
      }
    });
  }

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
          } else if (page === "favorites-team") {
            console.log("Masuk ke halaman favorites team");
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
