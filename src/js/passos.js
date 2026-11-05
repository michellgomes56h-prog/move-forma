/* "Como funciona": a linha laranja se desenha conforme a rolagem (CSS var --p, usada em transform). */

export function initPassos() {
  const wrap = document.querySelector('[data-passos]');
  if (!wrap) return;
  const passos = [...wrap.querySelectorAll('.passo')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wrap.style.setProperty('--p', 1);
    passos.forEach((p) => p.classList.add('is-ativo'));
    return;
  }

  let ativo = false, ticking = false;
  const atualiza = () => {
    ticking = false;
    const r = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 quando o topo da lista chega a 80% da tela; 1 quando o fim chega a 55%
    const ini = vh * 0.8, fim = vh * 0.55;
    const p = Math.min(1, Math.max(0, (ini - r.top) / (r.height + ini - fim)));
    wrap.style.setProperty('--p', p.toFixed(3));
    passos.forEach((el, i) => el.classList.toggle('is-ativo', p >= i / (passos.length - 1 || 1) - 0.02));
  };
  const onScroll = () => { if (ativo && !ticking) { ticking = true; requestAnimationFrame(atualiza); } };

  new IntersectionObserver(([e]) => { ativo = e.isIntersecting; if (ativo) atualiza(); }, { rootMargin: '20% 0px' }).observe(wrap);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}
