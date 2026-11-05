/* Mapa do Google sob demanda: capa leve; o iframe só é criado no clique
   ou quando a seção chega perto da tela. Nada pesa no carregamento inicial. */
import { ENDERECO } from './config.js';

export function initMapa() {
  const box = document.querySelector('[data-mapa]');
  if (!box) return;
  let carregado = false;

  const carrega = (focar = false) => {
    if (carregado) return;
    carregado = true;
    const f = document.createElement('iframe');
    f.src = ENDERECO.embedUrl;
    f.title = `Mapa: ${ENDERECO.rua} – ${ENDERECO.cidade}`;
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.allowFullscreen = true;
    f.addEventListener('load', () => box.querySelector('[data-mapa-btn]')?.remove(), { once: true });
    box.prepend(f);
    if (focar) f.focus();
  };

  box.querySelector('[data-mapa-btn]')?.addEventListener('click', () => carrega(true));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); carrega(); }
    }, { rootMargin: '300px 0px' });
    // só observa depois que a página terminou de carregar (não disputa banda com a hero)
    window.addEventListener('load', () => io.observe(box), { once: true });
  }
}
