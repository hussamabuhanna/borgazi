const PAGES = [
  { href: "index.html", label: "Gallery" },
  { href: "shop.html", label: "Shop" },
  { href: "originals.html", label: "Available Originals" },
  { href: "media.html", label: "Podcasts & Media" },
  { href: "courses.html", label: "Online Courses" },
  { href: "events.html", label: "Upcoming Events" },
  { href: "about.html", label: "About" },
  { href: "faq.html", label: "FAQ" },
  { href: "contact.html", label: "Contact" },
  { href: "links.html", label: "Links" }
];

function currentFile() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

function renderChrome() {
  const file = currentFile();
  const header = document.querySelector("[data-header]");
  if (header) {
    header.innerHTML = `
      <button class="menu-toggle" aria-expanded="false" aria-controls="nav">Menu <span>☰</span></button>
      <a class="logo" href="index.html">
        <span class="logo-script">Borgazi</span>
        <span class="logo-sub">Original Paintings</span>
      </a>
      <nav id="nav" class="nav" aria-label="Main">
        ${PAGES.map((page) => `<a href="${page.href}" class="${page.href === file ? "is-current" : ""}">${page.label}</a>`).join("")}
      </nav>
    `;
  }

  const footer = document.querySelector("[data-footer]");
  if (footer) {
    footer.innerHTML = `
      <span>© <span id="year"></span> Borgazi. All rights reserved.</span>
      <a href="#top">Back to top</a>
    `;
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const nav = document.querySelector("#nav");
  const toggle = document.querySelector(".menu-toggle");
  const scrim = document.querySelector(".scrim");
  function setMenu(open) {
    nav?.classList.toggle("open", open);
    scrim?.classList.toggle("visible", open);
    toggle?.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle?.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  scrim?.addEventListener("click", () => setMenu(false));
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
}

function renderNewsletter() {
  if (sessionStorage.getItem("borgazi-newsletter") === "closed") return;
  if (currentFile() !== "index.html") return;
  const modal = document.createElement("aside");
  modal.className = "modal";
  modal.setAttribute("aria-label", "Newsletter signup");
  modal.innerHTML = `
    <button class="modal-close" aria-label="Close">×</button>
    <h2>Please join the studio list</h2>
    <p>Be first to hear about new paintings, print releases, workshops, and events.</p>
    <form>
      <input type="email" name="email" placeholder="Email Address" required>
      <button class="btn" type="submit">Subscribe</button>
      <span class="fine">We respect your privacy.</span>
    </form>
  `;
  document.body.appendChild(modal);
  const close = () => {
    modal.remove();
    sessionStorage.setItem("borgazi-newsletter", "closed");
  };
  modal.querySelector(".modal-close").addEventListener("click", close);
  modal.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    modal.innerHTML = "<h2>Thank you</h2><p>You are on the list.</p>";
    sessionStorage.setItem("borgazi-newsletter", "closed");
    setTimeout(close, 1600);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  renderNewsletter();
  document.querySelectorAll(".faq-item button").forEach((button) => {
    button.addEventListener("click", () => button.parentElement.classList.toggle("open"));
  });
});
