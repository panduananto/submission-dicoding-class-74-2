import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "../../node_modules/materialize-css/dist/js/materialize.min.js";
import "../css/main.css";
import { getStandings } from "./api.js";
import navBarToStick from "./util.js";

document.addEventListener("DOMContentLoaded", function () {
  navBarToStick();
  getStandings();
});
