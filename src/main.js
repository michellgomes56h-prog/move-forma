import { initWhatsApp } from './js/whatsapp.js';
import { initHeader } from './js/header.js';
import { initHero } from './js/hero.js';

// Módulos de seção entram aqui conforme forem construídos:
// import { initReveal } from './js/reveal.js';
// import { initGaleria } from './js/galeria.js';
// import { initMapa } from './js/mapa.js';

initHero();
initHeader();
initWhatsApp();

// Ano automático do rodapé
document.querySelectorAll('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
