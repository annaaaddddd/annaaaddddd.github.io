# anna's site

Plain HTML/CSS/JS. No build step.

## Deploy on GitHub Pages
1. Create a repo named `annaaaddddd.github.io` (public).
2. Push these files to `main`.
3. Settings → Pages → Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
4. Site goes live at https://annaaaddddd.github.io in ~1 min.

## Where to edit
- `content.js` — **all content lives here**: intro, links, projects, timeline, off-screen. Search for `TODO(anna)`. Text fields accept inline HTML. Set `hidden: true` on a project to hide it.
- `style.css` — colors are at the top (`--accent` is the periwinkle). Layout: sticky sidebar + scrolling content.
- `main.js` — renders `content.js` into the page, plus theme toggle + dot-grid background. You shouldn't need to touch this to change content.
- `index.html` — just the page shell; no content in it.
- `media/` — drop project videos / photos here, then reference them from `content.js` (`media:` on a project, `gallery:` on an off-screen card).

## Todo
- [ ] Resume PDF + link
- [ ] Set Metal Renderer `hidden: false` when ready
