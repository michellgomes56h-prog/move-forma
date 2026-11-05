import { initWhatsApp } from './js/whatsapp.js';
import { initHeader } from './js/header.js';
import { initHero } from './js/hero.js';
import { initReveal } from './js/reveal.js';
import { initPassos } from './js/passos.js';
import { initGaleria } from './js/galeria.js';
import { initMapa } from './js/mapa.js';
import { initHorarios, initFab, initNavAtiva } from './js/extras.js';

initHero();
initHeader();
initWhatsApp();
initHorarios();
initReveal();
initPassos();
initGaleria();
initMapa();
initFab();
initNavAtiva();

// Ano automático do rodapé
document.querySelectorAll('[data-ano]').forEach((el) => { el.textContent = new Date().getFullYear(); });
