// ============================================================================
//  Rendering + behavior. Content lives in content.js — edit there, not here.
// ============================================================================

// ---------- helpers ----------
const $ = id => document.getElementById(id);

function linkAttrs(url) {
  return url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
}

// ---------- sidebar ----------
function renderSidebar(C) {
  $('eyebrow').textContent = C.eyebrow;

  const name = $('name');
  name.setAttribute('aria-label', C.name);
  name.innerHTML =
    [...C.name].map(ch =>
      ch === ' ' ? '<span class="space"> </span>' : `<span>${ch}</span>`
    ).join('') + '<span class="dot">.</span>';

  $('lede').innerHTML = C.lede;

  const email = $('email');
  email.href = 'mailto:' + C.email;
  email.textContent = C.email;

  $('links').innerHTML = C.links.map(l =>
    `<a href="${l.url}"${linkAttrs(l.url)}${l.todo ? ' class="todo"' : ''}>${l.label}</a>`
  ).join('');

  $('year').textContent = new Date().getFullYear();
  $('copyright').textContent = C.copyright;
  $('location').textContent = C.location;
}

// ---------- sections ----------
function projectHTML(p) {
  let media = '';
  if (p.media) {
    media = /\.(mp4|webm)$/i.test(p.media)
      ? `<video autoplay muted loop playsinline src="${p.media}"></video>`
      : `<img src="${p.media}" alt="">`;
  }
  const links = (p.links || []).map(l =>
    `<a href="${l.url}"${linkAttrs(l.url)}>${l.label} ↗</a>`
  ).join('');
  return `
    <li class="project">
      <div class="thumb${p.mediaFit === 'contain' ? ' contain' : ''}" style="--accent:${p.accent}">${media}</div>
      <div class="body">
        <p class="context">${p.context}</p>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <p class="tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</p>
        ${links ? `<p class="links">${links}</p>` : ''}
        ${p.note ? `<p class="note">${p.note}</p>` : ''}
      </div>
    </li>`;
}

const SECTIONS = [
  {
    id: 'projects',
    title: 'Projects',
    html: C => `<ul class="projects">${
      C.projects.filter(p => !p.hidden).map(projectHTML).join('')
    }</ul>`,
  },
  {
    id: 'timeline',
    title: 'Timeline',
    html: C => `<ol class="timeline">${
      C.timeline.map(t => `
        <li>
          <span class="when">${t.when}</span>
          <div><strong>${t.org}</strong><span>${t.detail}</span></div>
        </li>`).join('')
    }</ol>`,
  },
  {
    id: 'offscreen',
    title: 'Off-screen',
    html: C => `
      ${C.offscreenLede ? `<p class="section-lede">${C.offscreenLede}</p>` : ''}
      <div class="cards">${
        C.offscreen.map(o => `
          <article class="card">
            <h3>${o.title}</h3>
            <p>${o.desc}</p>
            ${o.rows ? `<ul class="mini-list">${o.rows.map(r => `
              <li><span class="when">${r.when}</span><span>${r.what}</span></li>`).join('')}
            </ul>` : ''}
            ${o.links ? `<p class="links">${o.links.map(l =>
              `<a href="${l.url}"${linkAttrs(l.url)}${l.todo ? ' class="todo"' : ''}>${l.label} ↗</a>`
            ).join('')}</p>` : ''}
            ${o.gallery.length ? `<div class="gallery">${
              o.gallery.map(src => `<img src="${src}" alt="" loading="lazy">`).join('')
            }</div>` : ''}
          </article>`).join('')
      }</div>`,
  },
];

function renderSections(C) {
  $('sections').innerHTML = SECTIONS.map((s, i) => `
    <section id="${s.id}" class="section">
      <h2><span class="num">0${i + 1}</span> ${s.title}</h2>
      ${s.html(C)}
    </section>`).join('');

  $('nav').innerHTML = SECTIONS.map((s, i) =>
    `<a href="#${s.id}"><span class="num">0${i + 1}</span>${s.title}</a>`
  ).join('');
}

renderSidebar(CONTENT);
renderSections(CONTENT);

// ---------- scrollspy: highlight the section in view ----------
const navLinks = [...document.querySelectorAll('.side-nav a')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('.section').forEach(s => spy.observe(s));

// ---------- theme toggle ----------
const root = document.documentElement;
const btn = $('theme');
function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
btn.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---------- background: dot grid that leans toward the cursor ----------
const canvas = $('bg');
const ctx = canvas.getContext('2d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

let W, H, dpr, cols, rows;
const GAP = 34;
const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth; H = innerHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cols = Math.ceil(W / GAP) + 1;
  rows = Math.ceil(H / GAP) + 1;
}
addEventListener('resize', resize);
resize();

addEventListener('pointermove', e => { mouse.tx = e.clientX; mouse.ty = e.clientY; });
addEventListener('pointerleave', () => { mouse.tx = -9999; mouse.ty = -9999; });

function dotColor() {
  return getComputedStyle(root).getPropertyValue('--dot').trim();
}
function accentColor() {
  return getComputedStyle(root).getPropertyValue('--accent').trim();
}

let t = 0;
function frame() {
  t += 0.008;
  // ease the cursor so the field feels like it has a little inertia
  mouse.x += (mouse.tx - mouse.x) * 0.08;
  mouse.y += (mouse.ty - mouse.y) * 0.08;

  ctx.clearRect(0, 0, W, H);
  const base = dotColor();
  const acc = accentColor();
  const R = 160; // influence radius

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x0 = i * GAP, y0 = j * GAP;
      // slow drift so it isn't dead-still
      const drift = reduce ? 0 : Math.sin(t + i * 0.35 + j * 0.2) * 1.2;
      const dx = x0 - mouse.x, dy = y0 - mouse.y;
      const d = Math.hypot(dx, dy);
      let x = x0, y = y0 + drift, r = 1.1;
      let color = base;
      if (d < R) {
        const k = 1 - d / R;          // 0..1, strongest at cursor
        const s = k * k;
        x -= (dx / (d || 1)) * s * 10; // pulled toward cursor
        y -= (dy / (d || 1)) * s * 10;
        r = 1.1 + s * 1.8;
        color = acc;
        ctx.globalAlpha = 0.15 + s * 0.6;
      } else {
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}
frame();
