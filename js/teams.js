document.addEventListener("DOMContentLoaded", function () {
  let item = getTeams();

  let collapsElement = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsElement);

  const favoriteDeleteButton = document.getElementById(
    "favorite-delete-button"
  );

  favoriteDeleteButton.onclick = function () {
    let favoriteDeleteButtonStatus = favoriteDeleteButton.children[0].innerHTML;
    if (favoriteDeleteButtonStatus === "favorite") {
      item.then(function (team) {
        addTeamToFavorite(team);
        renderFavoriteDeleteButton(team);
      });
    } else {
      item.then(function (team) {
        deleteTeamFromFavorite(team);
        renderFavoriteDeleteButton(team);
      });
    }
  };
});
