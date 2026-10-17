// Collections live in collections.js; this file just renders them.

const $ = (id) => document.getElementById(id);
const home = $("home");
const collectionView = $("collection-view");
const grid = $("collection-grid");
const gallery = $("gallery");
const filtersEl = document.querySelector(".filters");
const lightbox = $("lightbox");
const lbImg = $("lb-img");
const lbCaption = $("lb-caption");

const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
// Year under the title; collections without a year are ongoing series.
const metaLine = (c) => c.year || "Series";

// Fade items in as they scroll into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { rootMargin: "0px 0px -40px 0px" });

// ── Home: collection cards ─────────────────────────────────────
const cards = COLLECTIONS.map((c) => {
  const a = document.createElement("a");
  a.className = "collection-card";
  a.href = `#/${c.slug}`;
  a.dataset.group = c.group || "";
  a.innerHTML = `
    <div class="card-img"><img src="${escapeHtml(c.cover)}" alt="${escapeHtml(c.title)}" loading="lazy" decoding="async"></div>
    <div class="card-text">
      <h3>${escapeHtml(c.title)}</h3>
      <p>${escapeHtml(metaLine(c))}<span>${c.photos.length} photo${c.photos.length === 1 ? "" : "s"}</span></p>
    </div>`;
  grid.appendChild(a);
  observer.observe(a);
  return a;
});

const groups = ["All", ...new Set(COLLECTIONS.map((c) => c.group).filter(Boolean))];
groups.forEach((group, i) => {
  const btn = document.createElement("button");
  btn.textContent = group;
  btn.setAttribute("aria-pressed", i === 0);
  btn.addEventListener("click", () => {
    filtersEl.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", b === btn));
    cards.forEach((card) => {
      const show = group === "All" || card.dataset.group === group;
      card.hidden = !show;
      if (show) card.classList.add("visible");
    });
  });
  filtersEl.appendChild(btn);
});
if (groups.length <= 2) filtersEl.hidden = true;

// ── Home: hero slideshow ─────────────────────────────────────
// Slides come from slideshow.js; if that list is empty, one cover per collection.
const SLIDE_SECONDS = 6;
const heroCaption = $("hero-caption");
const heroDots = $("hero-dots");
const bySlug = Object.fromEntries(COLLECTIONS.map((c) => [c.slug, c]));
const slides = (typeof SLIDESHOW !== "undefined" && SLIDESHOW.length)
  ? SLIDESHOW.filter((s) => bySlug[s.collection]).map((s) => ({ src: s.src, collection: bySlug[s.collection] }))
  : COLLECTIONS.map((c) => ({ src: c.cover, collection: c }));
const heroSlides = slides.map((s, i) => {
  const img = document.createElement("img");
  img.className = "hero-slide";
  img.alt = s.collection.title;
  img.dataset.src = s.src;
  if (i === 0) img.src = img.dataset.src;
  $("hero-slides").appendChild(img);

  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `Show slide ${i + 1}: ${s.collection.title}`);
  dot.addEventListener("click", () => { showSlide(i); startSlideshow(); });
  heroDots.appendChild(dot);
  return img;
});
let slide = -1;
let slideTimer = null;

function loadSlide(i) {
  const img = heroSlides[i];
  if (!img.src) img.src = img.dataset.src;
}
function showSlide(i) {
  if (i === slide) return;
  slide = i;
  loadSlide(i);
  loadSlide((i + 1) % heroSlides.length); // get the next one ready
  heroSlides.forEach((img, n) => img.classList.toggle("active", n === i));
  heroDots.querySelectorAll("button").forEach((d, n) => d.setAttribute("aria-current", n === i));
  const c = slides[i].collection;
  heroCaption.textContent = [c.title, metaLine(c)].filter(Boolean).join(" · ");
  heroCaption.href = `#/${c.slug}`;
}
function startSlideshow() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide((slide + 1) % heroSlides.length), SLIDE_SECONDS * 1000);
}
function stopSlideshow() { clearInterval(slideTimer); slideTimer = null; }
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopSlideshow();
  else if (!home.hidden) startSlideshow();
});
showSlide(0);

// ── Single collection ─────────────────────────────────────────
let activePhotos = [];
let current = 0;

function renderCollection(c) {
  const i = COLLECTIONS.indexOf(c);
  const prev = COLLECTIONS[(i - 1 + COLLECTIONS.length) % COLLECTIONS.length];
  const next = COLLECTIONS[(i + 1) % COLLECTIONS.length];

  document.title = `${c.title}${c.year ? " " + c.year : ""} | Joe Kabalin Photography`;
  $("cv-meta").textContent = metaLine(c);
  $("cv-meta").hidden = !metaLine(c);
  $("cv-title").textContent = c.title;
  $("cv-description").textContent = c.description || "";
  $("cv-description").hidden = !c.description;
  $("cv-count").textContent = `${c.photos.length} photograph${c.photos.length === 1 ? "" : "s"}`;
  $("cv-prev").href = `#/${prev.slug}`;
  $("cv-prev").innerHTML = `<small>Previous</small>${escapeHtml(prev.title)}`;
  $("cv-next").href = `#/${next.slug}`;
  $("cv-next").innerHTML = `<small>Next</small>${escapeHtml(next.title)}`;

  activePhotos = c.photos;
  gallery.innerHTML = "";
  c.photos.forEach((p, idx) => {
    const fig = document.createElement("figure");
    fig.className = "gallery-item";
    fig.tabIndex = 0;
    const alt = p.caption || `${c.title}, photo ${idx + 1}`;
    fig.innerHTML = `<img src="${escapeHtml(p.src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">` +
      (p.caption ? `<figcaption class="caption">${escapeHtml(p.caption)}</figcaption>` : "");
    fig.addEventListener("click", () => openLightbox(idx));
    fig.addEventListener("keydown", (e) => { if (e.key === "Enter") openLightbox(idx); });
    gallery.appendChild(fig);
    observer.observe(fig);
  });
}

// ── Routing: #/slug shows a collection, anything else shows home ──
function route() {
  const hash = location.hash;
  const c = hash.startsWith("#/") && COLLECTIONS.find((x) => x.slug === hash.slice(2));
  closeMenu();
  closeLightbox();
  if (c) {
    renderCollection(c);
    home.hidden = true;
    stopSlideshow();
    collectionView.hidden = false;
    window.scrollTo(0, 0);
  } else {
    document.title = "Joe Kabalin Photography";
    const wasHidden = home.hidden;
    home.hidden = false;
    if (!slideTimer) startSlideshow();
    collectionView.hidden = true;
    const target = hash.length > 1 && !hash.startsWith("#/") && document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: wasHidden ? "instant" : scrollBehavior() });
    else if (wasHidden) window.scrollTo(0, 0);
  }
}
window.addEventListener("hashchange", route);

// Smooth-scroll in-page links (#about, #contact, ...) while the home page is showing.
// Done here rather than with CSS scroll-behavior, which fights the router's jump
// when coming back from a collection page.
const scrollBehavior = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link || home.hidden) return;
  const hash = link.getAttribute("href");
  if (hash.startsWith("#/")) return;
  const target = hash.length > 1 ? document.querySelector(hash) : null;
  e.preventDefault();
  closeMenu();
  history.pushState(null, "", hash.length > 1 ? hash : location.pathname + location.search);
  if (target) target.scrollIntoView({ behavior: scrollBehavior() });
  else window.scrollTo({ top: 0, behavior: scrollBehavior() });
});

// ── Lightbox ──────────────────────────────────────────────────
function showPhoto(i) {
  current = i;
  const p = activePhotos[i];
  lbImg.src = p.src;
  lbImg.alt = p.caption || "";
  lbCaption.textContent = p.caption ? `${p.caption} · ${i + 1} / ${activePhotos.length}` : `${i + 1} / ${activePhotos.length}`;
  // Preload neighbours so arrowing feels instant
  [i - 1, i + 1].forEach((n) => {
    const q = activePhotos[(n + activePhotos.length) % activePhotos.length];
    if (q) new Image().src = q.src;
  });
}
function openLightbox(i) {
  showPhoto(i);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
const step = (dir) => showPhoto((current + dir + activePhotos.length) % activePhotos.length);

lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lb-prev").addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
lightbox.querySelector(".lb-next").addEventListener("click", (e) => { e.stopPropagation(); step(1); });
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});

let touchX = null;
lightbox.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  touchX = null;
});

// ── Header + mobile menu ──────────────────────────────────────
const header = document.querySelector(".site-header");
const toggle = document.querySelector(".menu-toggle");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40 || home.hidden);
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("hashchange", onScroll);
onScroll();

function closeMenu() {
  document.body.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
}
toggle.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  toggle.setAttribute("aria-expanded", open);
});
document.querySelectorAll(".site-nav a").forEach((a) => a.addEventListener("click", closeMenu));

// ── Photo protection ──────────────────────────────────────────
// Blocks right-click "Save Image" and dragging photos out of the page.
// This deters casual copying; it can't stop screenshots.
document.addEventListener("contextmenu", (e) => { if (e.target.closest("img")) e.preventDefault(); });
document.addEventListener("dragstart", (e) => { if (e.target.closest("img")) e.preventDefault(); });

$("year").textContent = new Date().getFullYear();
route();
