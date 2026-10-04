/* =========================================================
   AETHER — content + interactions
   ---------------------------------------------------------
   EDIT YOUR CONTENT HERE. Everything the site shows lives in
   the `aether` object below. Put images in assets/img/ and
   point `avatar`/`src` at them (leave blank for a placeholder).
   ========================================================= */

const aether = {
  // -- DESIGN: pose music links (YouTube) --
  poseMusic: [
    "https://www.youtube.com/watch?v=bJieaH23524",
    "https://www.youtube.com/watch?v=G_JfKOjwzwo",
    "https://www.youtube.com/watch?v=0r2GNWvkd4U",
  ],

  // -- DESIGN: weapon stat sheet --
  stats: [
    { label: "Essence",   value: "Aether / Creation" },
    { label: "Type",      value: "Custom longsword" },
    { label: "Rarity",    value: "Exclusive" },
    { label: "Wielder",   value: "Divine" },
    { label: "Signature", value: "Parry & Perfect Parry" },
  ],

  // -- HOLDER LIST: developers / contributors --
  contributors: [
    { name: "Divine",  handle: "@DivineGaming15", reason: "Website + VFX", avatar: "assets/img/divine.png",  role: "owner" },
    { name: "saffron", handle: "@8holu",          reason: "Website",       avatar: "assets/img/saffron.png" },
  ],

  // -- HOLDER LIST: permanent holders --
  // role: "owner" | "" ; set avatar to an image path or leave "".
  holders: [
    { name: "Divine", handle: "@DivineGaming15", reason: "Creator & original owner", avatar: "assets/img/divine.png", role: "owner" },
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
  ],

  // -- HOLDER LIST: temporary holders --
  tempHolders: [
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
  ],

  // -- BLACKLIST --
  blacklist: [
    { name: "displayname", handle: "@username", reason: "reason", avatar: "" },
  ],
};

/* ------------------------- helpers ------------------------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function initials(name) {
  const n = String(name).trim();
  return n && n.toLowerCase() !== "displayname" ? n[0].toUpperCase() : "?";
}

function personCard(p, opts = {}) {
  const avatar = p.avatar
    ? `<img src="${esc(p.avatar)}" alt="${esc(p.name)}" loading="lazy" />`
    : `<span class="ph">${esc(initials(p.name))}</span>`;
  const tag = p.role === "owner" ? `<span class="tag">Owner</span>` : (opts.tag ? `<span class="tag">${esc(opts.tag)}</span>` : "");
  const handle = p.handle ? `<p class="person-handle">${esc(p.handle)}</p>` : "";
  const reason = p.reason ? `<p class="person-reason">${esc(p.reason)}</p>` : "";
  return `
    <article class="person ${opts.black ? "is-black" : ""}" data-role="${esc(p.role || "")}" data-search="${esc((p.name + " " + (p.handle||"") + " " + (p.reason||"")).toLowerCase())}">
      <div class="person-avatar">${avatar}</div>
      ${tag}
      <h4 class="person-name">${esc(p.name)}</h4>
      ${handle}
      ${reason}
    </article>`;
}

/* ------------------------- render ------------------------- */
function render() {
  // holder count on home
  const hc = $("[data-field='holder-count']");
  if (hc) hc.textContent = String(aether.holders.length);

  // design — pose music
  const pm = $("#pose-music");
  if (pm) pm.innerHTML = aether.poseMusic.map((u) =>
    `<li><a href="${esc(u)}" target="_blank" rel="noopener">${esc(u)}</a></li>`).join("");

  // design — stat sheet
  const ss = $("#statsheet");
  if (ss) ss.innerHTML = aether.stats.map((s) =>
    `<tr><td>${esc(s.label)}</td><td>${esc(s.value)}</td></tr>`).join("");

  // holder list
  const c = $("#contributors");
  if (c) c.innerHTML = aether.contributors.map((p) => personCard(p, { tag: "Contributor" })).join("");
  const h = $("#holders");
  if (h) h.innerHTML = aether.holders.map((p) => personCard(p)).join("");
  const t = $("#temp-holders");
  if (t) t.innerHTML = aether.tempHolders.map((p) => personCard(p, { tag: "Temporary" })).join("");

  // blacklist
  const b = $("#blacklist");
  if (b) b.innerHTML = aether.blacklist.map((p) => personCard(p, { black: true })).join("");
}

/* ------------------------- page switching ------------------------- */
function initPages() {
  const pages = $$(".page");
  const links = $$(".navlink");
  const nav = $(".topnav");
  const toggle = $("#navToggle");

  function show(name) {
    pages.forEach((p) => {
      const on = p.id === `page-${name}`;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.page === name));
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    if (history.replaceState) history.replaceState(null, "", `#${name}`);
  }

  $$("[data-page]").forEach((el) => el.addEventListener("click", () => show(el.dataset.page)));

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // open from hash (e.g. #design)
  const start = (location.hash || "").replace("#", "");
  if (["home", "design", "holders", "blacklist"].includes(start)) show(start);
}

/* ------------------------- sticky bar ------------------------- */
function initBar() {
  const bar = $("#topbar");
  const onScroll = () => bar.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------- holder search ------------------------- */
function initSearch() {
  const input = $("#holderSearch");
  if (!input) return;
  const empty = $("#search-empty");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    $$("#page-holders .person").forEach((card) => {
      const hit = !q || card.dataset.search.includes(q);
      card.style.display = hit ? "" : "none";
      if (hit) shown++;
    });
    $$("#page-holders .band").forEach((band) => { band.style.display = ""; });
    if (empty) empty.hidden = !(q && shown === 0);
  });
}

/* ------------------------- lightbox ------------------------- */
function initLightbox() {
  const lb = $("#lightbox"), img = $("#lbImg"), close = $("#lbClose");
  function open(src) { img.src = src; lb.hidden = false; }
  function hide() { lb.hidden = true; img.src = ""; }
  $$(".zoom").forEach((b) => b.addEventListener("click", () => open(b.dataset.src)));
  close.addEventListener("click", hide);
  lb.addEventListener("click", (e) => { if (e.target === lb) hide(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lb.hidden) hide(); });
}

/* ------------------------- embers ------------------------- */
function initEmbers() {
  const canvas = $("#embers");
  if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  let w, h, parts;
  const colors = ["168,119,255", "201,182,255", "123,95,174", "240,213,138"];

  function resize() {
    w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    const count = Math.min(70, Math.floor(w * h / 26000));
    parts = Array.from({ length: count }, () => spawn());
  }
  function spawn() {
    return {
      x: Math.random() * w, y: h + Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.5 + 0.15),
      vx: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.2,
      c: colors[Math.floor(Math.random() * colors.length)],
      tw: Math.random() * 0.03 + 0.01,
      t: Math.random() * Math.PI * 2,
    };
  }
  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.y += p.vy; p.x += p.vx; p.t += p.tw;
      if (p.y < -10) Object.assign(p, spawn(), { y: h + 10 });
      const alpha = p.a * (0.5 + 0.5 * Math.sin(p.t));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c}, ${alpha})`;
      ctx.shadowBlur = 8; ctx.shadowColor = `rgba(${p.c}, 0.9)`;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }
  resize(); addEventListener("resize", resize); frame();
}

/* ------------------------- boot ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  render();
  initPages();
  initBar();
  initSearch();
  initLightbox();
  initEmbers();
});
