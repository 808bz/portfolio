import '@fontsource-variable/inter'
import '@fontsource-variable/syne'
import '@fontsource-variable/jetbrains-mono'
import { App } from './App.js'
import { initNav, initReveal } from './main.reveal.js'
import './style.css'

document.documentElement.classList.add('js')

const appEl = document.querySelector('#app')

let lang = 'zh'
try {
  const saved = localStorage.getItem('lang')
  if (saved === 'zh' || saved === 'en') lang = saved
} catch {}

let route = location.hash || '#/'

function render() {
  appEl.innerHTML = App(lang, route)
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  initNav()
  initReveal()

  if (route === '#/' || route === '' || route.startsWith('#/project/')) {
    scrollTopInstant()
  } else {
    const id = route.slice(2)
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView()
    })
  }
}

function scrollTopInstant() {
  document.documentElement.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  document.documentElement.style.scrollBehavior = ''
}

function onHashChange() {
  route = location.hash || '#/'
  render()
}

window.addEventListener('hashchange', onHashChange)

appEl.addEventListener('click', (e) => {
  const toggle = e.target.closest('[data-lang-toggle]')
  if (!toggle) return
  lang = lang === 'zh' ? 'en' : 'zh'
  try {
    localStorage.setItem('lang', lang)
  } catch {}
  render()
})

render()
