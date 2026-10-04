# Aether — Kizuki Custom showcase

A single-page site for **Aether**, a custom weapon in the Roblox game *Kizuki*.
It has three tabs: **Holders**, **Development**, and **Reference**.

## Files
```
index.html            # page structure
assets/css/style.css  # all styling (ether / celestial theme)
assets/js/main.js      # content data + interactions
assets/img/            # put your screenshots / renders here
```

## Edit the content
All text lives in one place: the `aether` object at the top of
`assets/js/main.js`. Change the holders, development milestones, stats,
lore, and image paths there — the page rebuilds from it.

- **Holders** — add/remove entries in `holders`. `role` is `"owner"`,
  `"current"`, or `"past"`.
- **Development** — edit the `timeline` entries.
- **Reference** — edit `gallery` (set `img` to a file in `assets/img/` to
  show a real picture instead of the placeholder frame), `stats`, and `lore`.

## View it
Open `index.html` in a browser. To put it online for free, enable
**GitHub Pages** on this repo (Settings → Pages → deploy from branch) and
it will be served as a live website.

> Fan-made and unofficial — not affiliated with the Kizuki developers or Roblox Corporation.
