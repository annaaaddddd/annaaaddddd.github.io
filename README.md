# anna's site

Personal site at https://annaaaddddd.github.io. Plain HTML/CSS/JS, no build step: push to `main` and GitHub Pages redeploys in about a minute.

## Where to edit

- `content.js`: **all content lives here** (intro, links, projects, timeline, off-screen). Text fields accept inline HTML.
  - Projects are grouped: each project's `group` points at an id in `projectGroups`, and every group renders as a horizontal card carousel (drag, arrows, or swipe). Order on the page = order in the arrays.
  - `hidden: true` hides a project without deleting it.
  - `carouselLoop: true` makes the rows scroll endlessly; off until there are enough projects per group.
- `style.css`: colors are tokens at the top. Light mode is mint + periwinkle, dark mode is deep purple + butter yellow; the dark palette is defined twice (manual toggle and system preference), keep both in sync.
- `main.js`: renders `content.js` into the page, plus theme toggle, scrollspy, carousels, and the dot-grid background. Not needed for content changes.
- `index.html`: just the page shell, no content in it.
- `media/`: everything referenced from `content.js`. `projects/` holds project thumbnails, posters and clips; `offscreen/` holds the off-screen galleries and PDFs.
  - `media:` on a project takes a .jpg/.png/.gif/.mp4. Keep videos around 800px wide; a gif or mp4 with a `poster:` image stays on the poster until hover (touch screens just autoplay).
  - `gallery:` on an off-screen card takes a list of images.

## Todo

- [ ] Set Metal Renderer `hidden: false` when ready
