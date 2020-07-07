import "../node_modules/materialize-css/dist/css/materialize.min.css";
import "../node_modules/materialize-css/dist/js/materialize.min.js";
import "./css/main.css";
import "./js/load-page-on-nav.js";
import registerWorker from "./js/register-service-worker.js";
import navBarToStick from "./js/util.js";

registerWorker("service-worker.js");
navBarToStick();
