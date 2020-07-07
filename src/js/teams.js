import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../node_modules/materialize-css/dist/js/materialize.min.js";
import "../css/main.css";
import navBarToStick from "./util.js";
import { getTeams } from "./api.js";
import { addTeamToFavorite, deleteTeamFromFavorite } from "./db_operation.js";
import { renderFavoriteDeleteButton } from "./render.js";

document.addEventListener("DOMContentLoaded", function () {
  navBarToStick();
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
