/* =========================================================
   AETHER — content + interactions
   ---------------------------------------------------------
   EDIT YOUR CONTENT HERE. Everything the site shows lives in
   the `aether` object below. Put images in assets/img/ and
   point `avatar`/`src` at them (leave blank for a placeholder).
   ========================================================= */

const aether = {
  // -- DESIGN: pose music (click to play) --
  poseMusic: [
    { title: "Iron Lotus (Key Ingredient ver.)", artist: "Mili",                         src: "assets/audio/iron-lotus.mp3" },
    { title: "Between Two Worlds",                artist: "Realm of Darkness",             src: "assets/audio/realm-of-darkness.mp3" },
    { title: "Vanquish",                          artist: "Darling in the FranXX OST",     src: "assets/audio/vanquish.mp3" },
    { title: "CODE:002",                          artist: "Darling in the FranXX OST",     src: "assets/audio/code-002.mp3" },
    { title: "Kokushibo Theme",                   artist: "Demon Slayer: Infinity Castle", src: "assets/audio/kokushibo.mp3" },
    { title: "Kokushibo Theme (Epic Version)",     artist: "Demon Slayer Season 3 OST",     src: "assets/audio/kokushibo-epic.mp3" },
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

  // design — pose music tracklist
  const tl = $("#tracklist");
  if (tl) tl.innerHTML = aether.poseMusic.map((t, i) => `
    <li class="track" data-i="${i}">
      <button class="track-btn" aria-label="Play ${esc(t.title)}">
        <svg class="t-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg class="t-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>
      <span class="track-meta"><span class="track-title">${esc(t.title)}</span><span class="track-artist">${esc(t.artist || "")}</span></span>
      <span class="track-eq" aria-hidden="true"><i></i><i></i><i></i></span>
    </li>`).join("");

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
    reReveal(name);
    heroReset();
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

/* ------------------------- hero parallax (title lingers on scroll) ------------------------- */
let heroReset = () => {};
function initHeroParallax() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let ticking = false;

  function update() {
    ticking = false;
    const page = $(".page.is-active");
    if (!page) return;
    const hero = page.querySelector(".hero");
    const inner = page.querySelector(".hero-inner");
    if (!hero || !inner) return;
    const h = hero.offsetHeight || 1;
    const y = Math.min(window.scrollY, h);        // only while the hero is in play
    inner.style.transform = `translateY(${y * 0.5}px)`;   // title drifts down at half speed
    inner.style.opacity = String(Math.max(0.3, 1 - (window.scrollY / (h * 1.5))));
  }

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  heroReset = () => requestAnimationFrame(update);
  update();
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

/* ------------------------- music player ------------------------- */
function initPlayer() {
  const tracks = aether.poseMusic;
  const tl = $("#tracklist");
  if (!tl || !tracks.length) return;

  const audio = new Audio();
  audio.preload = "none";
  let cur = -1;

  const toggle = $("#playerToggle");
  const titleEl = $("#playerTitle");
  const seek = $("#playerSeek");
  const vol = $("#playerVol");
  const curT = $("#playerCur");
  const durT = $("#playerDur");

  // volume (restored from last visit when available)
  let saved = 0.8;
  try { const s = localStorage.getItem("aether-vol"); if (s !== null) saved = +s; } catch (e) {}
  audio.volume = saved;
  if (vol) {
    vol.value = Math.round(saved * 100);
    vol.addEventListener("input", () => {
      audio.volume = vol.value / 100;
      try { localStorage.setItem("aether-vol", String(audio.volume)); } catch (e) {}
    });
  }
  const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

  function paintState() {
    const playing = !audio.paused && cur >= 0;
    toggle.classList.toggle("is-playing", playing);
    $$("#tracklist .track").forEach((li) => {
      const on = +li.dataset.i === cur;
      li.classList.toggle("is-current", on);
      li.classList.toggle("is-playing", on && playing);
    });
  }

  function load(i) {
    cur = i;
    audio.src = tracks[i].src;
    titleEl.textContent = `${tracks[i].title}${tracks[i].artist ? " — " + tracks[i].artist : ""}`;
    toggle.disabled = false; seek.disabled = false;
  }
  function play(i) {
    if (i !== cur) load(i);
    audio.play().catch(() => {});
  }
  function toggleTrack(i) {
    if (i === cur && !audio.paused) audio.pause();
    else play(i);
  }

  tl.addEventListener("click", (e) => {
    const li = e.target.closest(".track");
    if (li) toggleTrack(+li.dataset.i);
  });
  toggle.addEventListener("click", () => {
    if (cur < 0) play(0);
    else if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  });

  audio.addEventListener("play", paintState);
  audio.addEventListener("pause", paintState);
  audio.addEventListener("ended", () => { if (cur < tracks.length - 1) play(cur + 1); else paintState(); });
  audio.addEventListener("loadedmetadata", () => { durT.textContent = fmt(audio.duration); });
  audio.addEventListener("timeupdate", () => {
    curT.textContent = fmt(audio.currentTime);
    if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
  });
  seek.addEventListener("input", () => { if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration; });

  // pause audio if leaving the Design page
  $$("[data-page]").forEach((el) => el.addEventListener("click", () => {
    if (el.dataset.page !== "design" && !audio.paused) audio.pause();
  }));

  paintState();
}

/* ------------------------- erkling hover sound ------------------------- */
function initErkling() {
  const erk = $(".erkling");
  if (!erk) return;
  const clips = ["assets/sfx/erk-1.mp3", "assets/sfx/erk-2.mp3", "assets/sfx/erk-3.mp3"]
    .map((src) => { const a = new Audio(src); a.preload = "none"; a.volume = 0.4; return a; });
  let last = 0, playing = null;

  erk.addEventListener("mouseenter", () => {
    const now = Date.now();
    if (now - last < 600) return;           // small cooldown so it doesn't spam
    if (playing && !playing.paused) return;  // don't overlap
    last = now;
    playing = clips[Math.floor(Math.random() * clips.length)];
    try { playing.currentTime = 0; playing.play().catch(() => {}); } catch (e) {}
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

/* ------------------------- scroll / page reveal ------------------------- */
let reReveal = () => {};
function initReveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const sel = ".title-crest, .earn, .portal, .media, .statsheet-wrap, .player, .person";
  const els = $$(sel);
  els.forEach((el) => {
    el.classList.add("reveal");
    const sibs = Array.from(el.parentNode.children).filter((c) => c.matches(sel));
    const i = Math.min(sibs.indexOf(el), 7);
    el.style.setProperty("--d", (i * 0.06) + "s");
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  els.forEach((el) => io.observe(el));

  // re-arm a page's cards so they drop in again each time it's opened
  reReveal = (page) => {
    $$(`#page-${page} .reveal`).forEach((el) => { el.classList.remove("in"); io.observe(el); });
  };
}

/* ------------------------- UI sound effects ------------------------- */
const SFX = (() => {
  let ctx, master;
  function ensure() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;         // keep everything gentle
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  // a soft sine blip with a quick pluck envelope
  function blip(freq, dur, vol, type = "sine") {
    const c = ensure(); if (!c) return;
    const t = c.currentTime;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(60, freq * 0.72), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t); o.stop(t + dur + 0.02);
  }
  return {
    tap() { blip(540, 0.07, 0.12, "triangle"); },                    // subtle click
    confirm() { blip(720, 0.08, 0.13, "sine"); setTimeout(() => blip(1080, 0.07, 0.07, "sine"), 42); }, // two-note
    soft() { blip(360, 0.06, 0.08, "sine"); },                       // close / back
  };
})();

function initSfx() {
  const RICH = ".portal, .navlink, .brand, .track, #playerToggle, .person-link";
  document.addEventListener("click", (e) => {
    // ignore drags on sliders
    if (e.target.closest("input[type=range]")) return;
    const el = e.target.closest("button, a, .track, .portal");
    if (!el) return;
    if (el.id === "lbClose") SFX.soft();
    else if (el.closest(RICH) || el.matches(RICH)) SFX.confirm();
    else SFX.tap();
  }, true);
}

/* ------------------------- boot ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  render();
  initReveal();
  initPages();
  initBar();
  initHeroParallax();
  initSearch();
  initPlayer();
  initErkling();
  initLightbox();
  initSfx();
  initEmbers();
});
