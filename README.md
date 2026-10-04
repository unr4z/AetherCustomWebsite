# Aether — Kizuki Custom

A single-page showcase for **Aether**, a custom weapon in the Roblox game *Kizuki*.
Rebuilt from the original site's purple identity with full-bleed hero art,
elegant serif titles, an ember background, image lightbox, and holder search.

Pages (top nav): **Home · Design · Holder List · Blacklist**

## Files
```
index.html             # structure (all four pages)
assets/css/style.css   # styling — purple / "creation" theme
assets/js/main.js      # content data + interactions
assets/img/            # hero backgrounds, weapon VFX, references, avatars
```

## Edit the content
Everything the site shows lives in the `aether` object at the top of
`assets/js/main.js`: `contributors`, `holders`, `tempHolders`, `blacklist`,
`poseMusic`, and `stats`. Add a person like:

```js
{ name: "DisplayName", handle: "@username", reason: "why", avatar: "assets/img/them.png" }
```

Leave `avatar: ""` to show a lettered placeholder. Add `role: "owner"` for a gold Owner badge.

## Swap images
Drop files into `assets/img/` and keep these names to replace them in place:
`hero-home.jpg`, `hero-design.jpg`, `hero-holders.jpg`, `logo-crown.png`,
`idle.jpg`, `block.jpg`, `parry.jpg`, `ref1.jpg`, `ref2.jpg`, `pose.jpg`,
`divine.png`, `saffron.png`.

## View / host
Open `index.html` in a browser. To host free: enable **GitHub Pages**
(Settings → Pages → deploy from this branch).

> Fan-made and unofficial — not affiliated with the Kizuki developers or Roblox Corporation.
