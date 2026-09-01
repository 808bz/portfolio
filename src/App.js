import content from './content.json'
const { CONTENT, PROJECTS, EXPERIENCE, ABOUT, CONTACT, FOOTER, CB_CASE, SENTIMENT_CASE } = content

const BASE = import.meta.env.BASE_URL

/* ------------------------------------------------------------------ *
 *  Rendering.  lang is passed in; L(obj) picks zh/en.
 * ------------------------------------------------------------------ */

export function App(lang, route = '#/') {
  const L = (v) => (typeof v === 'object' ? v[lang] : v)
  document.title = `${L(CONTENT.brand)} — ${L(CONTENT.roleLine)}`

  const isProject = route.startsWith('#/project/')
  const project = isProject ? PROJECTS.find((p) => `#/project/${p.slug}` === route) : null
  const view = project
    ? project.slug === 'cb-biliagent'
      ? CbCase(CB_CASE, project, L)
      : project.slug === 'bili-sentiment'
        ? CbCase(SENTIMENT_CASE, project, L)
        : CaseStudy(project, L)
    : Home(L)

  return `
    ${Nav(lang)}
    <main>
      ${view}
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
      <div class="hero__meta" data-reveal data-reveal-delay="2">
        <span>${L(CONTENT.heroMeta.loc)}</span>
        <span>${L(CONTENT.heroMeta.status)}</span>
      </div>
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
      ${PROJECTS.map((p) => ProjectItem(p, L)).join('')}
    </div>
  </section>
  `
}

function ProjectItem(p, L) {
  return `
  <article class="project">
    <a class="project__link" href="#/project/${p.slug}">
      <div class="project__head" data-reveal>
        <span class="project__no">${p.no}</span>
        <span class="project__cat">${L(p.category)}</span>
      </div>
      ${Visual(p, L, 'figure--ratio-169')}
      <div class="project__card" data-reveal>
        <h3 class="project__title">${L(p.title)}</h3>
        <p class="project__desc">${L(p.brief)}</p>
        <div class="project__meta">
          <span class="tag">${L(p.category)}</span>
          <span class="project__cta">${L(CONTENT.viewCase)}</span>
        </div>
      </div>
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

/* ------------------------------------------------------------------ *
 *  CB-BiliAgent custom case study
 * ------------------------------------------------------------------ */

function CbCase(caseData, project, L) {
  const c = caseData
  return `
  <section class="case cb" id="detail">
    <div class="container">
      <a class="case__back" href="#/work" data-reveal>${L(CONTENT.back)}</a>

      ${CbHero(c.hero, L)}
      ${c.stages.map((st) => renderStage(st, L)).join('')}
      ${CbFinal(c.final, L)}
      ${CbTech(c.tech, L)}
    </div>
  </section>
  `
}

function CbHero(hero, L) {
  const tags = hero.tags.map((t) => `<li class="tag">${L(t)}</li>`).join('')
  return `
  <header class="cb-hero" data-reveal>
    <p class="eyebrow">${L(hero.kicker)}</p>
    <h1 class="display-sm cb-hero__title">${L(hero.title)}</h1>
    <p class="cb-hero__sub">${L(hero.sub)}</p>
    <p class="cb-hero__intro">${L(hero.intro)}</p>
    <ul class="cb-tags">${tags}</ul>
    <div class="cb-meta">
      <div class="cb-meta__item">
        <span class="cb-meta__k">ROLE</span>
        <span class="cb-meta__v">${L(hero.role)}</span>
      </div>
      <div class="cb-meta__item">
        <span class="cb-meta__k">CONTEXT</span>
        <span class="cb-meta__v">${L(hero.context)}</span>
      </div>
    </div>
  </header>
  `
}

function FigureCB(file, caption, L) {
  const src = img(file)
  if (!src) return ''
  return `
  <figure class="figure figure--ratio-169 reveal-img" data-reveal>
    <span class="figure__media figure__media--img">
      <img class="figure__img" loading="lazy" alt="${caption ? L(caption) : ''}" src="${src}" />
    </span>
  </figure>
  `
}

function FlowStrip(flow, L) {
  return `
  <div class="cb-flow">${flow
    .map((f) => `<span class="cb-flow__item">${L(f)}</span>`)
    .join('<span class="cb-flow__arrow">→</span>')}</div>
  `
}

function stageHead(st, L) {
  return `
  <div class="cb-sec__head">
    <p class="eb">${st.no} — ${L(st.kicker)}</p>
    <h2 class="cb-heading">${L(st.title)}</h2>
    <p class="cb-body">${L(st.body)}</p>
  </div>`
}

function renderStage(st, L) {
  let visual = ''
  if (st.cases) visual = CbCasesV(st, L)
  else if (st.features) visual = CbWorkbenchV(st, L)
  else if (st.pains) visual = CbPainsV(st, L)
  else if (st.strategies) visual = CbQualityV(st, L)
  else if (st.example) visual = CbExampleV(st, L)
  else if (st.flow) visual = FlowStrip(st.flow, L)
  else if (st.stats) visual = CbStatsV(st, L)
  if (st.image && !st.cases && !st.features && !st.pains && !st.strategies && !st.example && !st.stats) {
    visual += FigureCB(st.image, st.imageCaption, L)
  }
  return `<section class="cb-sec" data-reveal>${stageHead(st, L)}${visual}</section>`
}

function CbStatsV(st, L) {
  return `
  <div class="cb-stats">${st.stats
    .map(
      (s) => `
    <div class="cb-stat">
      <span class="cb-stat__v">${s.v}</span>
      <span class="cb-stat__l">${L(s.label)}</span>
    </div>`
    )
    .join('')}</div>`
}

function CbExampleV(st, L) {
  return `
  <div class="cb-example">
    <div class="cb-ex">
      <span class="cb-ex__k">${L({ zh: 'Whisper 识别', en: 'Whisper heard' })}</span>
      <span class="cb-ex__v cb-ex__v--wrong">${L(st.example.wrong)}</span>
    </div>
    <span class="cb-ex__arrow">→</span>
    <div class="cb-ex">
      <span class="cb-ex__k">${L({ zh: '正确歌词', en: 'Actual lyric' })}</span>
      <span class="cb-ex__v">${L(st.example.right)}</span>
    </div>
  </div>
  <p class="cb-note">${L(st.example.note)}</p>
  <p class="cb-insight">${L(st.insight)}</p>
  `
}

function CbQualityV(st, L) {
  return `
  <div class="cb-compare">${st.strategies
    .map(
      (c) => `
    <div class="cb-compare__col">
      <p class="cb-compare__head">${L(c.head)}</p>
      <p class="cb-compare__body">${L(c.body)}</p>
    </div>`
    )
    .join('')}</div>
  <p class="cb-note">${L(st.prompt)}</p>
  <div class="cb-beforeafter">
    <span class="cb-ba__k">${L({ zh: 'Before', en: 'Before' })}</span>
    <span class="cb-ba__v">${L(st.before)}</span>
    <span class="cb-ba__arrow">→</span>
    <span class="cb-ba__k">${L({ zh: 'After', en: 'After' })}</span>
    <span class="cb-ba__v">${L(st.after)}</span>
  </div>
  <p class="cb-insight">${L(st.takeaway)}</p>
  `
}

function CbWorkbenchV(st, L) {
  return `
  <div class="cb-feats">${st.features
    .map(
      (f) => `
    <div class="cb-feat">
      <span class="cb-feat__n">${f.n}</span>
      <h3 class="cb-feat__t">${L(f.t)}</h3>
      <p class="cb-feat__d">${L(f.d)}</p>
    </div>`
    )
    .join('')}</div>
  <p class="cb-insight">${L(st.summary)}</p>
  ${FigureCB(st.image, st.imageCaption, L)}
  `
}

function CbCasesV(st, L) {
  return `
  <div class="cb-cases">${st.cases
    .map(
      (c) => `
    <div class="cb-case">
      <span class="cb-case__n">${c.n}</span>
      <h3 class="cb-case__t">${L(c.t)}</h3>
      <div class="cb-case__row">
        <span class="cb-case__l">${L({ zh: '问题', en: 'Problem' })}</span>
        <span class="cb-case__v">${L(c.p)}</span>
      </div>
      <div class="cb-case__row">
        <span class="cb-case__l">${L({ zh: '解决', en: 'Fix' })}</span>
        <span class="cb-case__v">${L(c.s)}</span>
      </div>
      <p class="cb-note">Technical Note · ${c.tech}</p>
    </div>`
    )
    .join('')}</div>
  <p class="cb-loop">${L(st.loop)}</p>
  <p class="cb-insight">${L(st.summary)}</p>
  `
}

function CbPainsV(st, L) {
  return `
  <div class="cb-feats">${st.pains
    .map(
      (p) => `
    <div class="cb-feat">
      <span class="cb-feat__n">${p.n}</span>
      <h3 class="cb-feat__t">${L(p.t)}</h3>
      <p class="cb-feat__d">${L(p.d)}</p>
    </div>`
    )
    .join('')}</div>
  ${FigureCB(st.image, st.imageCaption, L)}
  `
}

function CbFinal(final, L) {
  return `
  <section class="cb-sec cb-final" data-reveal>
    <p class="eb">${L(final.kicker)}</p>
    <h2 class="cb-final__title">${L(final.title)}</h2>
    <p class="cb-body cb-final__body">${L(final.body)}</p>
    ${FlowStrip(final.flow, L)}
    <p class="cb-final__gain">${L(final.gain)}</p>
  </section>
  `
}

function CbTech(tech, L) {
  return `
  <div class="cb-tech" data-reveal>
    <p class="eb">${L({ zh: '技术栈', en: 'Tech stack' })}</p>
    <p class="cb-tech__list">${L(tech)}</p>
  </div>
  `
}
