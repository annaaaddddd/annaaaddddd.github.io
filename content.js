// ============================================================================
//  ALL site content lives in this file. Edit here, refresh, done.
//  - Text fields accept inline HTML (<em>, <a>, …).
//  - Set `hidden: true` on a project to hide it without deleting it.
//  - `media` on a project: path to an .mp4 or image in media/ (optional).
//  - `poster` next to a gif `media`: still frame shown until hover plays the gif.
//  - `group` on a project matches an id in `projectGroups` below; groups render
//    as horizontal card carousels, in the order listed there.
// ============================================================================

const CONTENT = {
  // ---------- who ----------
  name: "Anna Dai",
  eyebrow: "Hi, I'm",
  lede: `MSE student in <em>Computer Graphics</em> at Penn.
         I work on real-time rendering, GPU programming, and game engine systems.`,

  // ---------- contact (lives in the sidebar) ----------
  email: "nanru.dai10@gmail.com",
  links: [
    { label: "Penn email", url: "mailto:nanrudai@engineering.upenn.edu" },
    { label: "GitHub", url: "https://github.com/annaaaddddd" },
    { label: "ShaderToy", url: "https://www.shadertoy.com/user/annaaaddd" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/nanru-dai-8b33a9261/" },
    // { label: "Resume", url: "#", todo: true },
  ],

  // ---------- footer ----------
  copyright: "Nanru Dai",
  location: "Philadelphia, PA",

  // ---------- projects ----------
  // Rows scroll normally for now; flip to true to make them loop endlessly
  // once there are enough projects per group (looks odd with only 2-3 cards).
  carouselLoop: false,
  // Each group's accent colors the thumbnails of every card in it.
  projectGroups: [
    { id: "gpu", title: "GPU &amp; Rendering", accent: "#76b900" },
    { id: "proc", title: "Shaders &amp; Procedural", accent: "#3a7bd5" },
    { id: "engine", title: "Engines &amp; Games", accent: "#e67e22" },
    { id: "research", title: "Research", accent: "#8e44ad" },
  ],
  projects: [
    {
      group: "gpu",
      context: "CIS 5650 · GPU Programming · Fall 2026",
      title: "CUDA Path Tracer",
      desc: `Physically based path tracer parallelized over path segments, with
             a from-scratch glTF loader and BVH (9x on a 25k-triangle kitchen).
             Refraction, textures, bump mapping, direct lighting, and thin-lens
             depth of field, each measured against a CPU baseline.`,
      tags: ["CUDA", "C++", "Path Tracing"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/CUDA-Path-Tracer" }],
      media: "media/path-tracer.jpg",
    },
    {
      group: "gpu",
      context: "CIS 5650 · GPU Programming · Fall 2026",
      title: "CUDA Boid Flocking",
      desc: `Naive, scattered-grid and coherent-grid flocking in CUDA. A 31×
             speedup at 1M boids from a cell-sorted memory layout, profiled
             with Nsight Systems &amp; Compute.`,
      tags: ["CUDA", "C++", "Nsight"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/CUDA-Flocking" }],
      media: "media/cuda-boids.gif",
      poster: "media/cuda-boids-poster.jpg",
    },
    {
      group: "gpu",
      context: "CIS 5650 · GPU Programming · Fall 2026",
      title: "WebGPU Forward+ &amp; Clustered Deferred Shading",
      desc: `Sponza under 5,000 moving lights in WebGPU. Compute-shader light
            clustering takes a naive 352 ms frame to 29.5 ms with Forward+
            and 9 ms with clustered deferred.`,
      tags: ["WebGPU", "WGSL", "TypeScript", "Forward+", "Clustered Shading", "Compute Shaders"],
      links: [
        { label: "Live demo", url: "https://annaaaddddd.github.io/WebGPU-Forward-Plus-and-Clustered-Deferred" },
        { label: "GitHub", url: "https://github.com/annaaaddddd/WebGPU-Forward-Plus-and-Clustered-Deferred" },
      ],
      media: "media/webgpu-forward-plus.jpg",
    },
    {
      hidden: true, // flip to false (or delete this line) when ready
      group: "gpu",
      context: "Ongoing",
      title: "Metal Renderer",
      desc: `A real-time renderer built from scratch with Apple Metal — custom
             pipeline states, command buffers, depth buffering, C++/Objective-C
             interop. Extending toward lighting and model loading.`,
      tags: ["Metal", "C++", "Objective-C"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/metalRenderer" }],
    },
    {
      group: "proc",
      context: "CIS 5660 · Procedural Computer Graphics · Fall 2026",
      title: "Balloon Bunny",
      desc: `Stylized Unity scene recreating a 2D balloon illustration, with a
            hand-drawn toon look: UV-space shadows, wobbling outlines, and a
            one-key sunset style switch.`,
      tags: ["Unity", "Shader Graph", "HLSL", "URP", "NPR", "Post-Processing"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/toon-balloon-bunny" }],
      media: "media/toon-bunny.png",
    },
    {
      group: "proc",
      context: "CIS 5660 · Procedural Computer Graphics · Fall 2026",
      title: "Procedural Fireball",
      desc: `A meteor falling through a procedural starfield: two-layer vertex
             displacement, domain-warped FBM fire shading, and a screen-space
             trail with rim fire and debris, in four cosine-palette themes.`,
      tags: ["GLSL", "WebGL2", "TypeScript"],
      links: [
        { label: "Live demo", url: "https://annaaaddddd.github.io/WebGL-fireball/" },
        { label: "GitHub", url: "https://github.com/annaaaddddd/WebGL-fireball" },
      ],
      media: "media/fireball.gif",
      poster: "media/fireball-poster.png",
    },
    {
      group: "proc",
      context: "CIS 5660 · Procedural Computer Graphics · Fall 2026",
      title: "Procedural Jellyfish",
      desc: `An animated jellyfish built from nodes and VEX in Houdini: one
             keyframed bell drives the pulse, veins grow as shortest paths
             across it, and Vellum arms and tentacles trail behind.`,
      tags: ["Houdini", "VEX", "Vellum", "Karma"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/procedural-jellyfish" }],
      media: "media/jellyfish.gif",
      poster: "media/jellyfish-poster.jpg",
    },
    {
      group: "proc",
      context: "CIS 5660 · Procedural Computer Graphics · Fall 2026",
      title: "Procedural Wave-Interference Shader",
      desc: `Real-time WebGL2 shader combining five object-space plane waves
             with fBM domain warping into seamless, anti-aliased interference
             patterns on a tumbling cube.`,
      tags: ["GLSL", "WebGL2", "TypeScript"],
      links: [
        { label: "Live demo", url: "https://annaaaddddd.github.io/wave-interference-cube/" },
        { label: "GitHub", url: "https://github.com/annaaaddddd/wave-interference-cube" },
      ],
      media: "media/wave-interference.gif",
      poster: "media/wave-interference-poster.jpg",
    },
    {
      group: "engine",
      context: "Game Engine Programming · JHU · Spring 2026",
      title: "2D Tile-Based Platformer Engine",
      desc: `Gameplay layer and engine subsystems on an ECS core: one-way tile
             collisions, moving platforms with rider carrying, springs,
             HP-driven enemies, and a live debug HUD.`,
      tags: ["C++", "ECS", "Engine"],
      links: [
        { label: "Gameplay demo", url: "https://youtu.be/vjgn7ThySco" },
        { label: "Fall death", url: "https://youtu.be/jS5XjLuooIY" },
        { label: "Game over", url: "https://youtu.be/KpQ3lVwxoGs" },
      ],
      note: "Course fork of a private repo — code available on request.",
      media: "media/platformer.jpg",
    },
    {
      group: "research",
      context: "ICLR 2026 Oral · Research with Prof. Alan Yuille, JHU",
      title: "World-in-World",
      desc: `A closed-loop world interface for evaluating generative world
             models on reasoning and goal completion, beyond visual fidelity.`,
      tags: ["Research", "World Models"],
      links: [{ label: "Project page", url: "https://world-in-world.github.io/" }],
      media: "media/wiw-logo.svg",
      mediaFit: "contain", // logo floats on the gradient instead of filling it
    },
  ],

  // ---------- timeline ----------
  timeline: [
    {
      when: "Aug 2026 – May 2028",
      org: "University of Pennsylvania",
      detail: "M.S.E. in Computer Graphics and Game Technology",
    },
    {
      when: "Mar 2025 – May 2026",
      org: "Johns Hopkins University",
      detail: "Research Assistant · generative world models, mentored by Jieneng Chen &amp; Alan Yuille",
    },
    {
      when: "Aug 2024 – Dec 2025",
      org: "Johns Hopkins University",
      detail: "Course Assistant · EN.601.457 Computer Graphics, EN.601.230 Mathematical Foundations for Computer Science",
    },
    {
      when: "Summer 2024",
      org: "Google",
      detail: `STEP Intern · New York, New York`,
    },
    {
      when: "Summer 2023",
      org: "Microsoft",
      detail: `Software Engineering Intern · Beijing, China`,
    },
    {
      when: "Aug 2022 – May 2026",
      org: "Johns Hopkins University",
      detail: "B.S. in Computer Science &amp; Applied Mathematics and Statistics, Minor in Robotics",
    },
  ],

  // ---------- off-screen ----------
  offscreenLede: "Things I make that don't compile?",
  offscreen: [
    {
      title: "Dance",
      desc: `Kpop &amp; hip-hop dance.`,
      rows: [
        { when: "2022 – 2026", what: `<strong>SLAM</strong> · member / President` },
        { when: "2022 – 2026", what: `<strong>KPM</strong> · member / Vice President` },
        { when: "2026 – Present", what: `<strong>K-beats</strong> · member` },
      ],
      links: [
        { label: "Favorite cover (KPM)", url: "https://youtu.be/9xWnomjHm3w" },
        { label: "Most recent choreo (SLAM)", url: "https://youtu.be/G9lNsuxpEuA" },
      ],
      gallery: [], // e.g. ["media/dance-1.jpg", "media/dance-2.jpg", "media/dance-3.jpg"]
    },
    {
      title: "Fiber",
      desc: `A semester of fiber art including coiled &amp; reed baskets, knitting,
             quilting, and (above all) crochet. 
             Favorite piece: a crocheted
             goblet replica at twice the original's scale, body crocheted as if
             liquid were spilling out.`,
      links: [
        { label: "Spring 2026 full portfolio (PDF)", url: "media/fiber-portfolio.pdf" },
      ],
      gallery: [
        "media/fiber-installation.jpg",
        "media/fiber-goblet.jpg",
        "media/fiber-quilt.jpg",
      ],
    },
  ],
};
