const PROJECTS = [
  {
    no: '01',
    title: 'Project One',
    description: 'A short, one-line description of this project.',
    tags: ['Product', 'AI', 'Content'],
  },
  {
    no: '02',
    title: 'Project Two',
    description: 'A short, one-line description of this project.',
    tags: ['Product', 'Mobile', 'Research'],
  },
  {
    no: '03',
    title: 'Project Three',
    description: 'A short, one-line description of this project.',
    tags: ['Platform', 'Design', 'Growth'],
  },
]

const SKILLS = [
  'Product Strategy',
  'Interaction Design',
  'AI Product',
  'Data Analysis',
  'Prototyping',
  'Front-end',
]

export function App() {
  return `
  ${Nav()}
  <main>
    ${Hero()}
    ${Work()}
    ${ProjectDetail()}
    ${About()}
    ${Contact()}
  </main>
  ${Footer()}
  `
}

function Nav() {
  return `
  <header class="nav">
    <div class="container nav__inner">
      <a href="#hero" class="nav__brand">[Name]</a>
      <nav class="nav__links" aria-label="Primary">
        <a href="#work">Work</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>
  `
}

function Hero() {
  return `
  <section id="hero" class="hero">
    <div class="container container--text">
      <p class="eyebrow" data-reveal>[Role / Specialization]</p>
      <h1 class="display" data-reveal data-reveal-delay="1">[Name]</h1>
      <p class="hero__statement" data-reveal data-reveal-delay="2">
        [One-line personal statement goes here.]
      </p>
    </div>
  </section>
  `
}

function Work() {
  return `
  <section id="work" class="work">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="eyebrow">01</p>
        <h2 class="h2">Selected Work</h2>
      </div>
      ${PROJECTS.map((p, i) => ProjectItem(p, i)).join('')}
    </div>
  </section>
  `
}

function ProjectItem(p, i) {
  return `
  <article class="project" data-reveal>
    <div class="project__head">
      <span class="project__no">${p.no}</span>
      <div class="project__heading">
        <h3 class="project__title">
          <a href="#detail">${p.title}</a>
        </h3>
        <p class="project__desc">${p.description}</p>
        <ul class="tags">
          ${p.tags.map((t) => `<li class="tag">${t}</li>`).join('')}
        </ul>
      </div>
    </div>
    <a href="#detail" class="figure figure--ratio-169 reveal-img" data-reveal tabindex="-1" aria-hidden="true">
      <span class="figure__media">
        <span class="figure__label">Image — 1600 × 900</span>
      </span>
    </a>
  </article>
  `
}

function ProjectDetail() {
  return `
  <section id="detail" class="detail">
    <div class="container">
      <header class="detail__intro" data-reveal>
        <p class="eyebrow">Case Study</p>
        <h2 class="h2">Project One</h2>
        <p class="detail__summary">
          A short summary of this project — one or two lines that frame the work
          and what follows.
        </p>
      </header>

      ${Phase(
        '01',
        'Problem',
        'A short paragraph describing the problem — what was broken, for whom, and why it mattered enough to solve.',
        { label: 'Image — 1600 × 900', alt: 'A wide visual illustrating the problem' }
      )}
      ${Phase(
        '02',
        'Insight',
        'A short paragraph describing the insight — the observation that reframed the problem and pointed to an answer.',
        { label: 'Image — 1600 × 900', alt: 'A wide visual capturing the key insight' }
      )}
      ${Phase(
        '03',
        'Solution',
        'A short paragraph describing the solution — what was designed and built, and the decisions behind it.',
        { label: 'Image — 1600 × 900', alt: 'A wide visual of the final solution' }
      )}

      <div class="outcome" data-reveal>
        <p class="eyebrow">04 — Outcome</p>
        <p class="outcome__number">+00%</p>
        <p class="outcome__caption">[Headline metric — e.g. key metric after launch]</p>
      </div>
    </div>
  </section>
  `
}

function Phase(no, title, text, visual) {
  return `
  <div class="phase">
    <div class="phase__head" data-reveal>
      <p class="eyebrow">${no}</p>
      <h3 class="phase__title">${title}</h3>
      <p class="phase__text">${text}</p>
    </div>
    <figure class="figure figure--ratio-169 reveal-img" data-reveal>
      <div class="figure__media">
        <span class="figure__label">${visual.label}</span>
      </div>
      <figcaption class="sr-only">${visual.alt}</figcaption>
    </figure>
  </div>
  `
}

function About() {
  return `
  <section id="about" class="about">
    <div class="container container--text">
      <p class="eyebrow" data-reveal>02 — About</p>
      <h2 class="h2" data-reveal data-reveal-delay="1">
        A short statement about who I am and how I work.
      </h2>
      <p class="about__body" data-reveal data-reveal-delay="2">
        One or two short paragraphs about background, focus, and working
        philosophy. Kept brief by design — details live in the work itself.
      </p>
      <div class="skills" data-reveal>
        ${SKILLS.map((s) => `<span class="skills__item">${s}</span>`).join('')}
      </div>
    </div>
  </section>
  `
}

function Contact() {
  return `
  <section id="contact" class="contact">
    <div class="container container--text">
      <p class="eyebrow" data-reveal>03 — Contact</p>
      <h2 class="display-sm" data-reveal data-reveal-delay="1">
        Let’s work<br />together.
      </h2>
      <div class="contact__links" data-reveal data-reveal-delay="2">
        <div class="contact__item">
          <p class="contact__label">Email</p>
          <a class="contact__value" href="mailto:hello@example.com">hello@example.com</a>
        </div>
        <div class="contact__item">
          <p class="contact__label">Resume</p>
          <a class="contact__value" href="#">Download ↓</a>
        </div>
        <div class="contact__item">
          <p class="contact__label">Social</p>
          <a class="contact__value" href="#">LinkedIn</a>
          <a class="contact__value" href="#">X</a>
          <a class="contact__value" href="#">GitHub</a>
        </div>
      </div>
    </div>
  </section>
  `
}

function Footer() {
  return `
  <footer class="footer">
    <div class="container footer__inner">
      <span>© 2026 [Name]</span>
      <a href="#hero">Back to top ↑</a>
    </div>
  </footer>
  `
}
