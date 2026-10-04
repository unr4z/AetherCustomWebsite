/* =========================================================
   AETHER — content + interactions
   ---------------------------------------------------------
   EDIT YOUR CONTENT HERE. Everything the site shows about
   Aether lives in this one object. Change names, dates,
   notes, stats and image paths and the page updates.
   ========================================================= */

const aether = {
  summary: {
    tier: "Custom · Exclusive",
    element: "Aether / Light",
    forged: "2025",
  },

  // --- HOLDERS -------------------------------------------------
  // role: "owner" | "current" | "past"
  holders: [
    { rank: 1, name: "YourUsername", role: "owner",   obtained: "First forged", note: "Creator and original owner of the Aether custom." },
    { rank: 2, name: "Holder Two",   role: "current", obtained: "Obtained 2025", note: "Won / traded for the custom — add how they got it." },
    { rank: 3, name: "Holder Three", role: "current", obtained: "Obtained 2025", note: "Add a short note about this holder." },
    { rank: 4, name: "Holder Four",  role: "past",    obtained: "Held in 2025",  note: "Previously held Aether before passing it on." },
  ],

  // --- DEVELOPMENT --------------------------------------------
  // key "release" gets a filled marker; use any keys you like.
  timeline: [
    { key: "concept",  date: "Stage 1 · Concept",  title: "The idea",        body: "First concept for a celestial, light-forged custom within Kizuki. Mood, name and element decided — replace with the real story." },
    { key: "design",   date: "Stage 2 · Design",   title: "Design & model",  body: "Blade silhouette, materials and the signature ether glow blocked out. Note who modelled / designed it here." },
    { key: "vfx",      date: "Stage 3 · Effects",  title: "VFX & animation", body: "Trail, slash and idle effects built to sell the 'drifting light' feel. Add the tools or contributors involved." },
    { key: "balance",  date: "Stage 4 · Testing",  title: "Balancing",       body: "Stats and move-set tuned in playtests so the custom felt fair alongside the standard kit." },
    { key: "release",  date: "Stage 5 · Release",  title: "Released in-game", body: "Aether went live as a custom. Add the release date and any launch details." },
  ],

  // --- REFERENCE ----------------------------------------------
  // Put image files in assets/img/ and set `img` to the path,
  // e.g. img: "assets/img/aether-blade.png". Leave img empty
  // to show a styled placeholder frame.
  gallery: [
    { img: "", sigil: "✦", title: "Blade reference",  caption: "Full weapon render / in-game screenshot." },
    { img: "", sigil: "❖", title: "Effect reference", caption: "Slash trail and ether glow VFX." },
    { img: "", sigil: "✧", title: "Concept art",      caption: "Early sketch or mood board." },
    { img: "", sigil: "◈", title: "In-game",          caption: "Aether equipped in Kizuki." },
  ],

  stats: [
    { label: "Element",   value: "Aether / Light" },
    { label: "Type",      value: "Custom weapon" },
    { label: "Rarity",    value: "Exclusive" },
    { label: "Damage",    value: "— (add value)" },
    { label: "Speed",     value: "— (add value)" },
    { label: "Signature", value: "Ether slash" },
  ],

  lore:
    "Aether is named for the classical \"fifth element\" — the pure upper air " +
    "the heavens were said to breathe. The blade leans into that idea: weightless " +
    "light, a cold star-glow edge, and motion that reads more like drifting than " +
    "swinging. Rewrite this with your own lore for the custom.",
};

/* ------------------------- render ------------------------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function renderSummary() {
  const s = aether.summary;
  setField("tier", s.tier);
  setField("element", s.element);
  setField("forged", s.forged);
  setField("holder-count", String(aether.holders.length));
}
function setField(name, val) {
  const el = document.querySelector(`[data-field="${name}"]`);
  if (el) el.textContent = val;
}

function renderHolders() {
  const grid = document.getElementById("holder-grid");
  if (!grid) return;
  grid.innerHTML = aether.holders.map((h) => {
    const badge =
      h.role === "owner" ? '<span class="badge owner">Owner</span>' :
      h.role === "current" ? '<span class="badge current">Current</span>' :
      '<span class="badge">Past holder</span>';
    return `
      <article class="holder" data-role="${esc(h.role)}">
        <div class="holder-top">
          <span class="holder-rank">#${esc(h.rank)}</span>
          ${badge}
        </div>
        <h4 class="holder-name">${esc(h.name)}</h4>
        <p class="holder-meta">${esc(h.obtained)}</p>
        <p class="holder-note">${esc(h.note)}</p>
      </article>`;
  }).join("");
}

function renderTimeline() {
  const ol = document.getElementById("timeline");
  if (!ol) return;
  ol.innerHTML = aether.timeline.map((t) => `
    <li class="tl-item" data-key="${esc(t.key)}">
      <p class="tl-date">${esc(t.date)}</p>
      <h4 class="tl-title">${esc(t.title)}</h4>
      <p class="tl-body">${esc(t.body)}</p>
    </li>`).join("");
}

function renderReference() {
  const gal = document.getElementById("ref-gallery");
  if (gal) {
    gal.innerHTML = aether.gallery.map((g) => {
      const inner = g.img
        ? `<img src="${esc(g.img)}" alt="${esc(g.title)}" loading="lazy" />`
        : `<span class="placeholder"><span class="sigil">${esc(g.sigil || "✦")}</span>${esc(g.title)}</span>`;
      return `
        <figure class="ref-card">
          <div class="ref-frame">${inner}</div>
          <figcaption class="ref-cap"><strong>${esc(g.title)}</strong>${esc(g.caption)}</figcaption>
        </figure>`;
    }).join("");
  }

  const body = document.getElementById("statsheet-body");
  if (body) {
    body.innerHTML = aether.stats.map((s) =>
      `<tr><td>${esc(s.label)}</td><td>${esc(s.value)}</td></tr>`).join("");
  }

  const lore = document.getElementById("lore-text");
  if (lore) lore.textContent = aether.lore;
}

/* ------------------------- tabs ------------------------- */
function initTabs() {
  const tabs = Array.from(document.querySelectorAll(".tab"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const glow = document.querySelector(".tab-glow");

  function moveGlow(tab) {
    if (!glow || !tab) return;
    glow.style.left = tab.offsetLeft + "px";
    glow.style.width = tab.offsetWidth + "px";
  }

  function activate(name, focus) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      if (on) { moveGlow(t); if (focus) t.focus(); }
    });
    panels.forEach((p) => {
      const on = p.id === `panel-${name}`;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => activate(tab.dataset.tab));
    tab.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const next = (i + dir + tabs.length) % tabs.length;
        activate(tabs[next].dataset.tab, true);
      }
    });
  });

  // links that jump to a specific tab
  document.querySelectorAll("[data-goto]").forEach((link) => {
    link.addEventListener("click", () => {
      activate(link.dataset.goto);
      setTimeout(() => moveGlow(document.querySelector(".tab.is-active")), 60);
    });
  });

  window.addEventListener("resize", () => moveGlow(document.querySelector(".tab.is-active")));
  // set initial glow position after fonts settle
  setTimeout(() => moveGlow(document.querySelector(".tab.is-active")), 120);
}

/* ------------------------- sticky bar ------------------------- */
function initTopbar() {
  const bar = document.querySelector(".topbar");
  if (!bar) return;
  const onScroll = () => bar.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ------------------------- ether particles ------------------------- */
function initEther() {
  const canvas = document.getElementById("ether");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  let w, h, dots;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 22000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      a: Math.random() * 0.5 + 0.2,
      tw: Math.random() * 0.02 + 0.004,
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      d.a += d.tw;
      if (d.x < 0) d.x = w; if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; if (d.y > h) d.y = 0;
      const alpha = 0.25 + Math.abs(Math.sin(d.a)) * 0.55;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(150, 230, 255, ${alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(111, 233, 255, 0.8)";
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener("resize", resize);
  frame();
}

/* ------------------------- boot ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  renderSummary();
  renderHolders();
  renderTimeline();
  renderReference();
  initTabs();
  initTopbar();
  initEther();
});
