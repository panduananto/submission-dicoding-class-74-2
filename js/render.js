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
        <div class="card small valign-wrapper hoverable">
          <div class="competition-card">
            <a href="./standings.html?id=${results.id}">          
              <img
                class="img-custom responsive-img"
                src="/assets/images/${results.code}.png"
                alt="${results.code}-image"
              />
            </a>
          </div>
        </div>
      </div>
    `;
  });
  document.getElementById("competitions-row").innerHTML = competitionsHTML;
}

function imgError(image) {
  image.onerror = "";
  image.src = "./assets/images/team_no_crest.svg";
  return true;
}

function renderStandings(data) {
  console.log(data);
  const headerStandingsContainer = document.getElementById(
    "header-standings-container"
  );
  headerStandingsContainer.innerHTML = `
    <div class="header-hero-standings valign-wrapper">
      <div class="header-text white-text">
        <p>
          ${data.competition.area.name} - ${data.competition.name}
        </p>
      </div>
    </div>
  `;

  let competitionID = data.competition.id;
  if (competitionID === 2001) {
    let standingsTableHTML = "";
    data.standings.forEach(function (results) {
      standingsTableHTML += `
        <tr class="group-ucl-row">
          <td>
            <span>${results.group.replace("_", " ")}</span>
          </td>
        </tr>
      `;
      results.table.forEach(function (standingResult) {
        let teamCrest = standingResult.team.crestUrl;
        if (teamCrest === null || teamCrest === undefined || teamCrest === "") {
          teamCrest = "./assets/images/team_no_crest.svg";
        }

        standingsTableHTML += `
          <tr>
            <td>${standingResult.position}</td>
            <td class="td-team">
              <a href="#">
                <div class="team-name-crest">
                  <img 
                    src="${teamCrest}" 
                    class="responsive-img" 
                    onerror="imgError(this)">
                  </img>
                  ${standingResult.team.name}
                </div>
              </a>
            </td>
            <td>${standingResult.playedGames}</td>
            <td>${standingResult.won}</td>
            <td>${standingResult.lost}</td>
            <td>${standingResult.draw}</td>
            <td>${standingResult.goalsFor}</td>
            <td>${standingResult.goalsAgainst}</td>
            <td>${standingResult.goalDifference}</td>
            <td>${standingResult.points}</td>
          </tr>
        `;
      });
      document.getElementById(
        "table-standings-row"
      ).innerHTML = standingsTableHTML;
    });
  } else {
    let standingsTableHTML = "";
    data.standings[0].table.forEach(function (results) {
      let teamCrest = results.team.crestUrl;
      if (teamCrest === null || teamCrest === undefined || teamCrest === "") {
        teamCrest = "./assets/images/team_no_crest.svg";
      }
      standingsTableHTML += `
        <tr>
          <td>${results.position}</td>
          <td class="td-team">
            <a href="#">
              <div class="team-name-crest">
                <img src="${teamCrest}" class="responsive-img"></img>
                ${results.team.name}
              </div>
            </a>
          </td>
          <td>${results.playedGames}</td>
          <td>${results.won}</td>
          <td>${results.lost}</td>
          <td>${results.draw}</td>
          <td>${results.goalsFor}</td>
          <td>${results.goalsAgainst}</td>
          <td>${results.goalDifference}</td>
          <td>${results.points}</td>
        </tr>
      `;
    });
    document.getElementById(
      "table-standings-row"
    ).innerHTML = standingsTableHTML;
  }
}
