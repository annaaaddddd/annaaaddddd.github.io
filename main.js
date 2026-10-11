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
function projectCard(p, i, accent) {
  let media = '';
  if (p.media) {
    if (/\.(mp4|webm)$/i.test(p.media)) {
      media = `<video autoplay muted loop playsinline src="${p.media}"></video>`;
    } else if (p.poster) {
      media = `<img src="${p.poster}" data-gif="${p.media}" alt="">
               <span class="hint">▶ hover to play</span>`;
    } else {
      media = `<img src="${p.media}" alt="">`;
    }
  }
  const links = (p.links || []).map(l =>
    `<a href="${l.url}"${linkAttrs(l.url)}>${l.label} ↗</a>`
  ).join('');
  return `
    <li class="pcard" style="--accent:${accent}; --i:${i}">
      <div class="pcard-top${p.mediaFit === 'contain' ? ' contain' : ''}">${media}</div>
      <div class="pcard-body">
        <p class="context">${p.context}</p>
        <h4>${p.title}</h4>
        <p class="pdesc">${p.desc}</p>
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
    html: C => C.projectGroups.map(g => {
      const items = C.projects.filter(p => !p.hidden && p.group === g.id);
      if (!items.length) return '';
      const arrows = items.length > 1 ? `
        <span class="row-nav">
          <button class="prev" aria-label="Scroll ${g.title} back">‹</button>
          <button class="next" aria-label="Scroll ${g.title} forward">›</button>
        </span>` : '';
      return `
        <div class="pgroup">
          <h3 class="group-title">${g.title}${arrows}</h3>
          <ul class="carousel">${items.map((p, i) => projectCard(p, i, g.accent)).join('')}</ul>
        </div>`;
    }).join(''),
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

// ---------- carousels rise in as they enter the viewport ----------
const rise = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    rise.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.carousel').forEach(c => rise.observe(c));

// ---------- carousels: drag + arrows, and (optionally) endless looping ----------
document.querySelectorAll('.carousel').forEach(car => {
  const originals = [...car.children];
  if (originals.length < 2) return; // a single card just sits there

  if (CONTENT.carouselLoop) {
    // enough copies that there is always a full set off-screen on each side
    const copies = Math.max(4, Math.ceil((car.clientWidth * 2) / car.scrollWidth) + 2);
    for (let c = 1; c < copies; c++) {
      originals.forEach(el => {
        const clone = el.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        car.appendChild(clone);
      });
    }

    let setW = 0;
    const measure = () => {
      setW = car.children[originals.length].offsetLeft - car.children[0].offsetLeft;
    };
    measure();
    addEventListener('resize', measure);
    car.scrollLeft = setW;

    car.addEventListener('scroll', () => {
      if (!setW) return;
      if (car.scrollLeft < setW * 0.5) car.scrollLeft += setW;
      else if (car.scrollLeft > setW * 1.5) car.scrollLeft -= setW;
    });
  }

  // drag to scroll with the mouse (trackpads and touch already scroll natively)
  let dragging = false, moved = false, startX = 0, startLeft = 0;
  car.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse') return;
    dragging = true; moved = false;
    startX = e.clientX; startLeft = car.scrollLeft;
  });
  addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) moved = true;
    car.scrollLeft = startLeft - dx;
  });
  addEventListener('pointerup', () => { dragging = false; });
  car.addEventListener('click', e => {
    if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
  }, true);

  // arrow buttons glide one card per click (ends clamp unless looping)
  const step = originals[1].offsetLeft - originals[0].offsetLeft; // card + gap
  let anim;
  const glide = delta => {
    cancelAnimationFrame(anim);
    const start = performance.now(), from = car.scrollLeft, dur = 400;
    const tick = now => {
      const t = Math.min(1, (now - start) / dur);
      car.scrollLeft = from + delta * (1 - Math.pow(1 - t, 3));
      if (t < 1) anim = requestAnimationFrame(tick);
    };
    anim = requestAnimationFrame(tick);
  };
  const nav = car.closest('.pgroup').querySelector('.row-nav');
  if (nav) {
    if (car.scrollWidth <= car.clientWidth + 4) {
      nav.remove(); // the whole row fits, nothing to scroll
    } else {
      nav.querySelector('.prev').addEventListener('click', () => glide(-step));
      nav.querySelector('.next').addEventListener('click', () => glide(step));
    }
  }
});

// ---------- gifs: still poster until hover (bound after carousel cloning) ----------
document.querySelectorAll('img[data-gif]').forEach(img => {
  if (!matchMedia('(hover: hover)').matches) {
    img.src = img.dataset.gif; // no hover on touch screens: just animate
    return;
  }
  const poster = img.src;
  const card = img.closest('.pcard');
  card.addEventListener('mouseenter', () => { img.src = img.dataset.gif; });
  card.addEventListener('mouseleave', () => { img.src = poster; });
});

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
