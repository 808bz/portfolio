import { CONTENT, PROJECTS, EXPERIENCE, ABOUT, CONTACT, FOOTER } from './content.js'

const BASE = import.meta.env.BASE_URL

/* ------------------------------------------------------------------ *
 *  Rendering.  lang is passed in; L(obj) picks zh/en.
 * ------------------------------------------------------------------ */

export function App(lang, route = '#/') {
  const L = (v) => (typeof v === 'object' ? v[lang] : v)
  document.title = `${L(CONTENT.brand)} — ${L(CONTENT.roleLine)}`

  const isProject = route.startsWith('#/project/')
  const project = isProject ? PROJECTS.find((p) => `#/project/${p.slug}` === route) : null

  return `
    ${Nav(lang)}
    <main>
      ${project ? CaseStudy(project, L) : Home(L)}
    </main>
    ${Footer(L)}
  `
}

function img(file) {
  return file ? `${BASE}content/${file}` : null
}

function Nav(lang) {
  const L = (v) => v[lang]
  const sections = [
    { id: 'work', label: L(CONTENT.navWork), hash: '#/work' },
    { id: 'about', label: L(CONTENT.navAbout), hash: '#/about' },
    { id: 'contact', label: L(CONTENT.navContact), hash: '#/contact' },
  ]
  return `
  <header class="nav">
    <div class="container nav__inner">
      <a href="#/" class="nav__brand">${L(CONTENT.brand)}</a>
      <nav class="nav__right" aria-label="Primary">
        ${sections.map((s) => `<a class="nav__link" href="${s.hash}">${s.label}</a>`).join('')}
        <button class="nav__toggle" data-lang-toggle>${L(CONTENT.langLabel)}</button>
      </nav>
    </div>
  </header>
  `
}

function Hero(L) {
  return `
  <section class="hero" id="hero">
    <div class="container">
      <p class="eyebrow" data-reveal>${L(CONTENT.roleLine)}</p>
      <h1 class="display" data-reveal data-reveal-delay="1">${L(CONTENT.brand)}</h1>
      <p class="hero__statement" data-reveal data-reveal-delay="2">
        ${L(CONTENT.statement)}
      </p>
    </div>
  </section>
  `
}

function Home(L) {
  return `
    ${Hero(L)}
    ${Work(L)}
    ${Experience(L)}
    ${AboutSection(L)}
    ${Contact(L)}
  `
}

function Work(L) {
  return `
  <section id="work" class="work">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="eyebrow">${PROJECTS.length} Projects</p>
        <h2 class="h2">${L(CONTENT.selectedWork)}</h2>
      </div>
      ${PROJECTS.map((p, i) => ProjectItem(p, i, L)).join('')}
    </div>
  </section>
  `
}

function ProjectItem(p, i, L) {
  return `
  <article class="project">
    <a class="project__link" href="#/project/${p.slug}">
      <div class="project__head grid" data-reveal>
        <span class="project__no">${p.no}</span>
        <div class="project__main">
          <h3 class="project__title">${L(p.title)}</h3>
          <p class="project__desc">${L(p.brief)}</p>
          <div class="project__meta">
            <span class="tag">${L(p.category)}</span>
          </div>
        </div>
        <span class="project__cta">${L(CONTENT.viewCase)}</span>
      </div>
      ${Visual(p, L, 'figure--ratio-169')}
    </a>
  </article>
  `
}

function Visual(p, L, ratio) {
  const src = img(p.image)
  if (src) {
    return `
    <figure class="figure ${ratio} reveal-img" data-reveal>
      <span class="figure__media figure__media--img">
        <img class="figure__img" loading="lazy" alt="${L(p.title)}" src="${src}" />
      </span>
    </figure>
    `
  }
  return `
    <figure class="figure ${ratio} reveal-img" data-reveal>
      <span class="figure__media">
        <span class="figure__label">${p.no} — ${L(p.category)}</span>
      </span>
    </figure>
  `
}

function CaseStudy(p, L) {
  const figs = [Visual(p, L, 'figure--ratio-169')]
  const src2 = img(p.image2)
  if (src2) {
    figs.push(`
      <figure class="figure figure--ratio-169 reveal-img" data-reveal>
        <span class="figure__media figure__media--img">
          <img class="figure__img" loading="lazy" alt="${L(p.title)}" src="${src2}" />
        </span>
      </figure>
    `)
  }
  return `
  <section class="case" id="detail">
    <div class="container">
      <a class="case__back" href="#/work" data-reveal>${L(CONTENT.back)}</a>
      <header class="case__intro" data-reveal>
        <p class="eyebrow">${p.no} — ${L(p.category)}</p>
        <h1 class="display-sm">${L(p.title)}</h1>
        <p class="case__lead">${L(p.brief)}</p>
      </header>
      ${figs.join('')}
      <div class="case__grid">
        <div class="case__block" data-reveal>
          <h2 class="case__label">${L(CONTENT.core)}</h2>
          <ul class="points">
            ${p.points.map((pt) => `<li>${L(pt)}</li>`).join('')}
          </ul>
        </div>
        <div class="case__block" data-reveal>
          <h2 class="case__label">${L(CONTENT.role)}</h2>
          <p class="case__role">${L(p.roleFull)}</p>
        </div>
      </div>
      <div class="outcome" data-reveal>
        <p class="eyebrow">${L(CONTENT.outcome)}</p>
        <p class="outcome__number">${p.outcome.value}</p>
        <p class="outcome__caption">${L(p.outcome.caption)}</p>
      </div>
    </div>
  </section>
  `
}

function Experience(L) {
  return `
  <section id="experience" class="experience">
    <div class="container">
      <div class="section-head" data-reveal>
        <p class="eyebrow">Experience</p>
        <h2 class="h2">${L(CONTENT.experienceTitle)}</h2>
      </div>
      ${EXPERIENCE.map(
        (e) => `
      <div class="exp" data-reveal>
        <div class="exp__head grid">
          <p class="exp__no">${e.no}</p>
          <div class="exp__title">
            <h3 class="exp__org">${L(e.org)}</h3>
            <p class="exp__role">${L(e.role)}</p>
          </div>
          <p class="exp__period">${L(e.period)}</p>
        </div>
        <ul class="exp__list">
          ${e.highlights.map((h) => `<li>${L(h)}</li>`).join('')}
        </ul>
      </div>
      `
      ).join('')}
    </div>
  </section>
  `
}

function AboutSection(L) {
  const skills = ABOUT.skills.map((s) => `<span class="skills__item">${L(s)}</span>`).join('')
  return `
  <section id="about" class="about">
    <div class="container container--text">
      <p class="eyebrow" data-reveal>${L(CONTENT.aboutTitle)}</p>
      <h2 class="h2" data-reveal data-reveal-delay="1">${L(ABOUT.heading)}</h2>
      <p class="about__body" data-reveal data-reveal-delay="2">${L(ABOUT.body)}</p>
      <div class="about__meta" data-reveal>
        <p class="about__edu">${L(ABOUT.education)} <span class="muted">· ${L(ABOUT.period)}</span></p>
        <p class="about__games">${L(ABOUT.games)}</p>
      </div>
      <div class="skills" data-reveal>${skills}</div>
    </div>
  </section>
  `
}

function Contact(L) {
  return `
  <section id="contact" class="contact">
    <div class="container container--text">
      <p class="eyebrow" data-reveal>${L(CONTENT.navContact)}</p>
      <h2 class="display-sm" data-reveal data-reveal-delay="1">${L(CONTACT.heading)}</h2>
      <div class="contact__links" data-reveal data-reveal-delay="2">
        <div class="contact__item">
          <p class="contact__label">Email</p>
          <a class="contact__value" href="mailto:${CONTACT.email}">${CONTACT.email}</a>
        </div>
        <div class="contact__item">
          <p class="contact__label">Phone</p>
          <span class="contact__value">${CONTACT.phone}</span>
        </div>
        <div class="contact__item">
          <p class="contact__label">${L(CONTENT.intent)}</p>
          <span class="contact__value">${L(CONTACT.intent)}</span>
        </div>
      </div>
    </div>
  </section>
  `
}

function Footer(L) {
  return `
  <footer class="footer">
    <div class="container footer__inner">
      <span>© 2026 ${L(CONTENT.brand)} — ${L(FOOTER.note)}</span>
      <a href="#/">${L(FOOTER.top)}</a>
    </div>
  </footer>
  `
}
