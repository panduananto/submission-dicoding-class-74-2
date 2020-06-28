// Available competition: 2000,2001,2002,2003,2013,2014,2015,2016,2017,2018,2019,2021

const baseURL = "https://api.football-data.org/v2/";

const api_token = "ac4e6663c07745218da11725425871ab";

function fetchAPI(url) {
  return fetch(url, {
    headers: {
      "X-Auth-Token": api_token,
    },
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error: " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error: " + error);
}

function getCompetitions() {
  preLoader();
  fetchAPI(baseURL + "competitions?plan=TIER_ONE")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      hideLoader();
      renderCompetitions(data);
    })
    .catch(error);
}

function getStandings() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  preLoader();
  fetchAPI(
    baseURL + "competitions/" + idParam + "/standings/?standingType=TOTAL"
  )
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      hideLoader();
      renderStandings(data);
    })
    .catch(error);
}

function getTeams() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  fetchAPI(baseURL + "teams/" + idParam)
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      renderTeams(data);
    })
    .catch(error);
}
