const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

siteNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const modal = document.getElementById("artModal");
const modalTitle = document.getElementById("modalTitle");
const modalMedium = document.querySelector(".modal-medium");
const modalDescription = document.querySelector(".modal-description");

document.querySelectorAll(".art-button").forEach((button) => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title;
    modalMedium.textContent = `${button.dataset.medium} · ${button.dataset.size} · ${button.dataset.year}`;
    modalDescription.textContent = button.dataset.description;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modal.querySelectorAll("[data-close]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

document.getElementById("year").textContent = new Date().getFullYear();