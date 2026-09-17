// ============================================================================
//  ALL site content lives in this file. Edit here, refresh, done.
//  - Text fields accept inline HTML (<em>, <a>, …).
//  - Set `hidden: true` on a project to hide it without deleting it.
//  - `media` on a project: path to an .mp4 or image in media/ (optional).
//  - `poster` next to a gif `media`: still frame shown until hover plays the gif.
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
  projects: [
    {
      context: "CIS 5650 · GPU Programming",
      title: "CUDA Boid Flocking",
      desc: `Naive, scattered-grid and coherent-grid flocking in CUDA. A 31×
             speedup at 1M boids from a cell-sorted memory layout, profiled
             with Nsight Systems &amp; Compute.`,
      tags: ["CUDA", "C++", "Nsight"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/CUDA-Flocking" }],
      accent: "#76b900",
      media: "media/cuda-boids.gif",
      poster: "media/cuda-boids-poster.jpg",
    },
    {
      context: "CIS 5660 · Procedural Computer Graphics",
      title: "Procedural Wave-Interference Shader",
      desc: `Real-time WebGL2 shader combining five object-space plane waves
             with fBM domain warping into seamless, anti-aliased interference
             patterns on a tumbling cube.`,
      tags: ["GLSL", "WebGL2", "TypeScript"],
      links: [
        { label: "Live demo", url: "https://annaaaddddd.github.io/wave-interference-cube/" },
        { label: "GitHub", url: "https://github.com/annaaaddddd/wave-interference-cube" },
      ],
      accent: "#3a7bd5",
      media: "media/wave-interference.gif",
      poster: "media/wave-interference-poster.jpg",
    },
    {
      context: "ICLR 2026 Oral · Research with Prof. Alan Yuille, JHU",
      title: "World-in-World",
      desc: `A closed-loop world interface for evaluating generative world
             models on reasoning and goal completion, beyond visual fidelity.`,
      tags: ["Research", "World Models"],
      links: [{ label: "Project page", url: "https://world-in-world.github.io/" }],
      accent: "#8e44ad",
      media: "media/wiw-logo.svg",
      mediaFit: "contain", // logo floats on the gradient instead of filling it
    },
    {
      context: "Game Engine Programming · JHU",
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
      accent: "#e67e22",
      media: "media/platformer.jpg",
    },
    {
      hidden: true, // flip to false (or delete this line) when ready
      context: "Ongoing",
      title: "Metal Renderer",
      desc: `A real-time renderer built from scratch with Apple Metal — custom
             pipeline states, command buffers, depth buffering, C++/Objective-C
             interop. Extending toward lighting and model loading.`,
      tags: ["Metal", "C++", "Objective-C"],
      links: [{ label: "GitHub", url: "https://github.com/annaaaddddd/metalRenderer" }],
      accent: "#c0392b",
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
