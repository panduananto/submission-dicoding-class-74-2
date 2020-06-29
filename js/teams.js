document.addEventListener("DOMContentLoaded", function () {
  getTeams();
  
  let collapsElement = document.querySelectorAll(".collapsible");
  M.Collapsible.init(collapsElement);
});
