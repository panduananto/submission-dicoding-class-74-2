const baseUrl = "https://api.football-data.org/v2/";

const api_token = "ac4e6663c07745218da11725425871ab";

function fetchAPi(url) {
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
