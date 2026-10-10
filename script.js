const menuButton = document.querySelector(".menu-button");
const menuPanel = document.querySelector(".menu-panel");
const closeButton = document.querySelector(".close-menu");
const scrim = document.querySelector(".scrim");

function setMenu(open) {
  menuPanel.classList.toggle("open", open);
  scrim.classList.toggle("visible", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
}
menuButton.addEventListener("click", () => setMenu(!menuPanel.classList.contains("open")));
closeButton.addEventListener("click", () => setMenu(false));
scrim.addEventListener("click", () => setMenu(false));
menuPanel.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
document.querySelector("#year").textContent = new Date().getFullYear();
