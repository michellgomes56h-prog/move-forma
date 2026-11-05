import { initWhatsApp } from './js/whatsapp.js';

// Módulos de seção entram aqui conforme forem construídos:
// import { initHeader } from './js/header.js';
// import { initHero } from './js/hero.js';
// import { initReveal } from './js/reveal.js';
// import { initGaleria } from './js/galeria.js';
// import { initMapa } from './js/mapa.js';

initWhatsApp();

// Ano automático do rodapé
document.querySelectorAll('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
