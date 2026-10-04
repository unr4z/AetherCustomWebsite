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
    { label: "Name",    value: "Aether Sword" },
    { label: "Type",    value: "Katana" },
    { label: "Rarity",  value: "Custom" },
    { label: "Wielder", value: "Divine" },
  ],

  // -- HOLDER LIST: developers / contributors --
  contributors: [
    { name: "Divine",      handle: "@DivineGaming15", reason: "Website + VFX", avatar: "assets/img/divine.png",     role: "owner", profile: "https://www.roblox.com/users/2523725933/profile" },
    { name: "MValestral",  handle: "",                reason: "Sound Designer", avatar: "assets/img/mvalestral.png",             profile: "https://www.roblox.com/users/2020725177/profile" },
  ],

  // -- HOLDER LIST: permanent holders --
  // role: "owner" | "" ; set avatar to an image path or leave "".
  holders: [
    { name: "Divine", handle: "@DivineGaming15", reason: "Creator & original owner", avatar: "assets/img/divine.png", role: "owner", profile: "https://www.roblox.com/users/2523725933/profile" },
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
  const profile = p.profile
    ? `<a class="person-link" href="${esc(p.profile)}" target="_blank" rel="noopener">
         <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><rect x="9" y="9" width="6" height="6"/></svg>
         Roblox Profile</a>`
    : "";
  return `
    <article class="person ${opts.black ? "is-black" : ""}" data-role="${esc(p.role || "")}" data-search="${esc((p.name + " " + (p.handle||"") + " " + (p.reason||"")).toLowerCase())}">
      <div class="person-avatar">${avatar}</div>
      ${tag}
      <h4 class="person-name">${esc(p.name)}</h4>
      ${handle}
      ${reason}
      ${profile}
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
  if (["home", "design", "holders", "title", "blacklist"].includes(start)) show(start);
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

/* ------------------------- background VFX (embers · streaks · lightning) ------------------------- */
function initEmbers() {
  const canvas = $("#embers");
  if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  let w, h, parts, streaks;
  const bolts = [];
  const colors = ["168,119,255", "201,182,255", "123,95,174", "240,213,138"];

  function resize() {
    w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    parts = Array.from({ length: Math.min(70, Math.floor(w * h / 26000)) }, spawnEmber);
    streaks = Array.from({ length: Math.min(9, Math.floor(w / 220)) }, spawnStreak);
  }

  // rising glowing embers / orbs
  function spawnEmber() {
    return {
      x: Math.random() * w, y: h + Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.5 + 0.15), vx: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.2, c: colors[(Math.random() * colors.length) | 0],
      tw: Math.random() * 0.03 + 0.01, t: Math.random() * Math.PI * 2,
    };
  }
  // diagonal energy streaks drifting across
  function spawnStreak() {
    const len = Math.random() * 120 + 60;
    return {
      x: Math.random() * w, y: Math.random() * h,
      len, vx: (Math.random() * 0.4 + 0.2) * (Math.random() < .5 ? -1 : 1),
      vy: Math.random() * 0.25 + 0.08,
      a: Math.random() * 0.25 + 0.05, c: colors[(Math.random() * 2) | 0],
    };
  }

  // jagged lightning bolt with branches
  function makeBolt() {
    const x0 = Math.random() * w, segs = 14 + (Math.random() * 8 | 0);
    const pts = [{ x: x0, y: -20 }];
    let x = x0, y = -20; const step = (h + 60) / segs;
    for (let i = 0; i < segs; i++) { x += (Math.random() - 0.5) * 70; y += step; pts.push({ x, y }); }
    const branches = [];
    for (let i = 4; i < pts.length - 2; i++) {
      if (Math.random() < 0.22) {
        const b = [{ ...pts[i] }]; let bx = pts[i].x, by = pts[i].y;
        const n = 3 + (Math.random() * 4 | 0);
        for (let j = 0; j < n; j++) { bx += (Math.random() - 0.5) * 60; by += step * 0.7; b.push({ x: bx, y: by }); }
        branches.push(b);
      }
    }
    bolts.push({ pts, branches, life: 1, hue: Math.random() < 0.5 ? "190,150,255" : "220,200,255" });
  }
  function drawPath(p, width, color, alpha) {
    ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y);
    for (let i = 1; i < p.length; i++) ctx.lineTo(p[i].x, p[i].y);
    ctx.lineWidth = width; ctx.strokeStyle = `rgba(${color}, ${alpha})`;
    ctx.shadowBlur = 18; ctx.shadowColor = `rgba(${color}, 0.9)`;
    ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
  }

  let next = 90 + Math.random() * 160; // frames until next bolt
  function frame() {
    ctx.clearRect(0, 0, w, h);

    // streaks
    for (const s of streaks) {
      s.x += s.vx; s.y += s.vy;
      if (s.y > h + 40 || s.x < -160 || s.x > w + 160) Object.assign(s, spawnStreak(), { y: -20 });
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * s.len, s.y - s.vy * s.len);
      grad.addColorStop(0, `rgba(${s.c}, ${s.a})`); grad.addColorStop(1, `rgba(${s.c}, 0)`);
      ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * s.len, s.y - s.vy * s.len);
      ctx.lineWidth = 1.4; ctx.strokeStyle = grad; ctx.shadowBlur = 0; ctx.stroke();
    }

    // embers
    for (const p of parts) {
      p.y += p.vy; p.x += p.vx; p.t += p.tw;
      if (p.y < -10) Object.assign(p, spawnEmber(), { y: h + 10 });
      const alpha = p.a * (0.5 + 0.5 * Math.sin(p.t));
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c}, ${alpha})`;
      ctx.shadowBlur = 8; ctx.shadowColor = `rgba(${p.c}, 0.9)`; ctx.fill();
    }

    // lightning
    if (--next <= 0) { makeBolt(); if (Math.random() < 0.4) makeBolt(); next = 120 + Math.random() * 220; }
    for (let i = bolts.length - 1; i >= 0; i--) {
      const b = bolts[i];
      const flick = b.life * (0.6 + Math.random() * 0.4);
      drawPath(b.pts, 2.4, b.hue, flick);
      drawPath(b.pts, 1, "255,255,255", flick * 0.8);
      for (const br of b.branches) drawPath(br, 1.4, b.hue, flick * 0.7);
      b.life -= 0.045;
      if (b.life <= 0) bolts.splice(i, 1);
    }
    // soft screen flash while a fresh bolt is alive
    const flash = bolts.reduce((m, b) => Math.max(m, b.life), 0);
    if (flash > 0.7) { ctx.fillStyle = `rgba(150,110,220,${(flash - 0.7) * 0.12})`; ctx.shadowBlur = 0; ctx.fillRect(0, 0, w, h); }

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
