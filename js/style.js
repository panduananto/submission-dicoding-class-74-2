const navElement = document.querySelector(".nav-custom");
window.onscroll = () => {
  let top = window.scrollY;
  if (top >= 4) {
    navElement.classList.add("black", "sticky-nav");
  } else {
    navElement.classList.remove("black", "sticky-nav");
  }
};

function cardToVertical() {
  const cardHorizontalElement = document.querySelectorAll(
    ".card-horizontal-container"
  );
  const cardStackedElement = document.querySelectorAll(
    ".card-stacked-container"
  );
  window.onresize = () => {
    let windowWidth = window.innerWidth;
    console.log(windowWidth);
    if (windowWidth <= 682) {
      cardHorizontalElement.forEach((item) => {
        item.classList.remove("horizontal");
      });
      cardStackedElement.forEach((item) => {
        item.classList.remove("card-stacked");
      });
    } else if (windowWidth > 682) {
      cardHorizontalElement.forEach((item) => {
        item.classList.add("horizontal");
      });
      cardStackedElement.forEach((item) => {
        item.classList.add("card-stacked");
      });
    }
  };
}

function trimText() {
  let excerpt = document.querySelectorAll(".excerpt");

  excerpt.forEach((element) => {
    let excerptText = element.innerText;
    if (excerptText.length > 100) {
      let trimmedText = `${excerptText.substr(0, 120)}...`;
      element.innerHTML = trimmedText;
    }
  });
}
