import '@fontsource-variable/inter'
import { App } from './App.js'
import { initNav, initReveal } from './main.reveal.js'
import './style.css'

document.documentElement.classList.add('js')
document.querySelector('#app').innerHTML = App()

initNav()
initReveal()
