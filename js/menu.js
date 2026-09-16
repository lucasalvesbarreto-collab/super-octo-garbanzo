const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu-principal");

if (menuToggle && menu) {
  function setMenuState(isOpen) {
    menuToggle.setAttribute("aria-expanded", String(isOpen));

    if (!isOpen) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false);
    }
  });
}
