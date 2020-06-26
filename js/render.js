function pageNotFound(content) {
  const headerElement = document.querySelector(".page-header");
  const footerElement = document.querySelector(".page-footer");

  headerElement.style.display = "none";
  footerElement.style.display = "none";

  content.innerHTML = `
    <div class="not-found-page valign-wrapper">
      <img class="responsive-img" src="./assets/images/404.svg" alt="404-image"></img>
      <span>Page not found</span>
      <p>Maaf, halaman yang Anda tuju tidak dapat ditemukan</p>
      <a href="./" class="btn-go-home deep-purple accent-3 btn">GO HOME</a>
    </div>
  `;
}

function pageCannotAccess(content) {
  const headerElement = document.querySelector(".page-header");
  const footerElement = document.querySelector(".page-footer");

  headerElement.style.display = "none";
  footerElement.style.display = "none";

  content.innerHTML = `
    <div class="not-found-page valign-wrapper">
      <img class="responsive-img" src="./assets/images/cannot_access.svg" alt="404-image"></img>
      <span>Access Forbidden</span>
      <p>Maaf, Anda tidak bisa mengakses halaman ini</p>
      <a href="./" class="btn-go-home deep-purple accent-3 btn">GO HOME</a>
    </div>
  `;
}

function preLoader() {
  let pageLoader = "";
  pageLoader += `
    <div class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div>
        <div class="gap-patch">
          <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  `;
  document.getElementById("loader").innerHTML = pageLoader;
}

function hideLoader() {
  document.getElementById("loader").innerHTML = "";
}

function renderCompetitions(data) {
  let competitionsHTML = "";
  data.competitions.slice(0, 11).forEach(function (results) {
    competitionsHTML += `
      <div class="col s12 m6 l4">
        <div class="card small valign-wrapper">
          <div class="competition-card">
            <img
              class="img-custom responsive-img"
              src="/assets/images/${results.code}.png"
              alt="${results.code}-image"
            />
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById("competitions-row").innerHTML = competitionsHTML;
}

function getStandings() {}
