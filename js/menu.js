const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu-principal");
const themeToggle = document.querySelector(".theme-toggle");
const contrastToggle = document.querySelector(".contrast-toggle");

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const prefersHighContrast = window.matchMedia("(prefers-contrast: more)").matches;

function applyTheme() {
  document.body.classList.toggle("theme-dark", localStorage.getItem("theme") === "dark");
  document.body.classList.toggle("high-contrast", localStorage.getItem("contrast") === "high");

  if (themeToggle) {
    const isDark = document.body.classList.contains("theme-dark");
    themeToggle.textContent = isDark ? "Modo claro" : "Modo escuro";
    themeToggle.setAttribute("aria-label", isDark ? "Alternar para modo claro" : "Alternar para modo escuro");
  }

  if (contrastToggle) {
    const isHighContrast = document.body.classList.contains("high-contrast");
    contrastToggle.textContent = isHighContrast ? "Contraste normal" : "Alto contraste";
    contrastToggle.setAttribute("aria-label", isHighContrast ? "Alternar para contraste normal" : "Alternar para alto contraste");
  }
}

if (prefersDarkMode && !localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

if (prefersHighContrast && !localStorage.getItem("contrast")) {
  localStorage.setItem("contrast", "high");
}

applyTheme();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("theme-dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
    applyTheme();
  });
}

if (contrastToggle) {
  contrastToggle.addEventListener("click", () => {
    const isHighContrast = document.body.classList.contains("high-contrast");
    localStorage.setItem("contrast", isHighContrast ? "normal" : "high");
    applyTheme();
  });
}

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
