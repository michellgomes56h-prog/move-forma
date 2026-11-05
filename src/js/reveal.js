/* Revelação ao rolar (.reveal → .is-visible) e cards que "acendem" no celular
   (no desktop a borda acende no hover; em telas de toque, ao entrar no centro da tela). */

export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('is-visible')); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
  els.forEach((el) => io.observe(el));

  if (window.matchMedia('(hover: none)').matches) {
    const centro = new IntersectionObserver((entries) => {
      entries.forEach((e) => e.target.classList.toggle('is-aceso', e.isIntersecting));
    }, { rootMargin: '-35% 0px -35% 0px' });
    document.querySelectorAll('[data-acende]').forEach((el) => centro.observe(el));
  }
}
