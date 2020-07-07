function navBarToStick() {
  const navElement = document.querySelector(".nav-custom");
  window.onscroll = () => {
    let top = window.scrollY;
    if (top >= 4) {
      navElement.classList.add("black", "sticky-nav");
    } else {
      navElement.classList.remove("black", "sticky-nav");
    }
  };
}

export default navBarToStick;
