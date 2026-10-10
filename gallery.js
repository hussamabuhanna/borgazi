const ARTWORKS = [
  {
    title: "The Generous Hour",
    meta: "30\" × 40\" acrylic on canvas, 2025",
    size: "wide",
    alt: "Luminous figurative painting in warm earth tones",
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Bounty",
    meta: "18\" × 36\" acrylic on canvas, 2025",
    size: "",
    alt: "Tall still-life painting with fruit and foliage",
    src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "The Witness",
    meta: "20\" × 16\" acrylic on canvas, 2024",
    size: "narrow",
    alt: "Portrait-style painting with a quiet gaze",
    src: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "The Allure",
    meta: "16\" × 20\" acrylic on canvas, 2024",
    size: "narrow",
    alt: "Intimate painting with rich colour",
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "The Language of Stillness",
    meta: "36\" × 18\" acrylic and gold leaf on canvas, 2024",
    size: "wide",
    alt: "Wide landscape-oriented painting",
    src: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Becoming",
    meta: "36\" × 12\" acrylic and gold leaf on canvas, 2024",
    size: "wide",
    alt: "Horizontal painting with metallic highlights",
    src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1600&q=80"
  },
  {
    title: "Origins",
    meta: "24\" × 30\" oil on canvas, 2023",
    size: "",
    alt: "Symbolic painting with layered colour",
    src: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Song of the Makers",
    meta: "60\" × 30\" acrylic on canvas, 2023",
    size: "wide",
    alt: "Expansive painting suggesting night sky and creation",
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1600&q=80"
  }
];

const STATEMENTS = {
  1: `<p>Every form carries a story. Every colour holds a feeling. This collection explores the connections between inner worlds and the living world around us.</p>`,
  4: `<p>We are a strand in a much larger tapestry: soil and starlight, memory and possibility, growth and change. The work is an invitation to pause, look closer, and find your own meaning.</p>`
};

function renderGallery() {
  const root = document.querySelector("[data-gallery]");
  if (!root) return;
  root.innerHTML = ARTWORKS.map((work, index) => `
    ${STATEMENTS[index] ? `<div class="statement">${STATEMENTS[index]}</div>` : ""}
    <article class="artwork ${work.size}">
      <a href="${work.src}" data-index="${index}">
        <img src="${work.src}" alt="${work.alt}">
      </a>
      <div class="artwork-caption">
        <h2>“${work.title}”</h2>
        <p>${work.meta}</p>
      </div>
    </article>
  `).join("");

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">×</button>
    <button class="lightbox-nav prev" aria-label="Previous">‹</button>
    <img alt="">
    <button class="lightbox-nav next" aria-label="Next">›</button>
    <div class="lightbox-caption"></div>
  `;
  document.body.appendChild(lightbox);

  let current = 0;
  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");

  function show(index) {
    current = (index + ARTWORKS.length) % ARTWORKS.length;
    const work = ARTWORKS[current];
    img.src = work.src;
    img.alt = work.alt;
    caption.innerHTML = `<strong>“${work.title}”</strong><div>${work.meta}</div>`;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function hide() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  root.querySelectorAll("a[data-index]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(Number(link.dataset.index));
    });
  });
  lightbox.querySelector(".lightbox-close").addEventListener("click", hide);
  lightbox.querySelector(".prev").addEventListener("click", () => show(current - 1));
  lightbox.querySelector(".next").addEventListener("click", () => show(current + 1));
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) hide();
  });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;
    if (event.key === "Escape") hide();
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
}

document.addEventListener("DOMContentLoaded", renderGallery);
