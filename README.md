# Photography Portfolio

A plain HTML/CSS/JS site with no build step, ready for GitHub Pages.

The home page shows a grid of collections; each one opens its own gallery at a shareable link like `yoursite/#/iceland-2023`.

## Adding photos

1. Export your images (~2000px on the long edge, JPEG quality ~80 keeps the site fast).
2. Drop them into the matching folder:

   | Collection | Folder |
   |---|---|
   | Iceland 2023 | `photos/iceland-2023/` |
   | Lighthouses | `photos/lighthouses/` |
   | Wildlife | `photos/wildlife/` |
   | Arches National Park 2024 | `photos/arches-2024/` |
   | Canyonlands National Park 2024 | `photos/canyonlands-2024/` |
   | Zion National Park 2025 | `photos/zion-2025/` |
   | Bryce Canyon National Park 2025 | `photos/bryce-canyon-2025/` |
   | Spain 2026 | `photos/spain-2026/` |
   | Portugal 2026 | `photos/portugal-2026/` |
   | Japan 2026 | `photos/japan-2026/` |
   | North Carolina | `photos/north-carolina/` |
   | Utah | `photos/utah/` |

3. Run, from this folder:
   ```bash
   python3 update_photos.py
   ```
   This fills in `collections.js` with every image in each folder (sorted by filename; prefix with `01-`, `02-`… to control order). Run it again any time you add or remove photos; captions you've written are kept.

## Editing collections

Open `collections.js`. For each collection you can change:

- `title`, `year`: shown on the card and collection page
- `group`: drives the filter buttons (currently International, Series, National Parks, United States)
- `description`: an optional paragraph at the top of the collection
- `cover`: only used if a collection has no photos; otherwise each home-page card shows a random photo from its collection on every visit
- `caption` on any photo: shown on hover and in the full-screen viewer

The order of collections in the file is the order on the site.

**To add a new collection**, copy an existing `{ ... }` block, give it a new `slug`, create `photos/<slug>/`, and run `update_photos.py`.

Keep the file valid JSON: double quotes, no trailing commas.

## Home-page slideshow

`slideshow.js` lists the slideshow photos in the order they play. Each entry names the photo and the collection it links to:

```js
{ src: "photos/zion-2025/angels-landing.jpg", collection: "zion-2025" },
```

Empty the list to fall back to one cover photo per collection. Speed is set by `SLIDE_SECONDS` in `script.js`.

## Other text

Name, headline, about paragraph, email, Instagram link, and the about image are in `index.html`.

## Preview locally

```bash
python3 -m http.server 8000
```
Then open http://localhost:8000

## Publish to GitHub Pages

Live site: **https://jkabalinphotography.github.io**

The GitHub repository must be named `jkabalinphotography.github.io`.

To publish changes after the first upload:
```bash
git add .
git commit -m "Describe what changed"
git push
```
GitHub Pages rebuilds automatically; changes appear within a minute or two.

Keep exported images web-sized (about 2000px, under 1 MB). GitHub Pages sites should stay under 1 GB.
