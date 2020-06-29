document.addEventListener("DOMContentLoaded", function () {
  let item = getTeams();

  let collapsElement = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsElement);

  const favoriteButton = document.getElementById("favorite-button");
  favoriteButton.onclick = function () {
    console.log("fab clicked");
    item.then(function (team) {
      addTeamToFavorite(team);
    });
  };
});
