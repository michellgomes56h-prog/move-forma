/* Header fixo: fundo ao rolar + menu mobile acessível (ESC, foco preso, inert no resto) */

export function initHeader() {
  const header = document.querySelector('[data-header]');
  const burger = document.querySelector('[data-burger]');
  const label = document.querySelector('[data-burger-label]');
  const menu = document.querySelector('[data-menu]');
  if (!header) return;

  // ---- fundo ao rolar (rAF + passive, sem custo de layout) ----
  let ticking = false;
  const atualiza = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(atualiza); }
  }, { passive: true });
  atualiza();

  if (!burger || !menu) return;

  const fundo = [document.querySelector('main'), document.querySelector('footer'), document.querySelector('.skip-link')].filter(Boolean);
  const focaveis = () => [burger, ...menu.querySelectorAll('a[href], button')];

  const abrir = () => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('is-open'));
    burger.setAttribute('aria-expanded', 'true');
    label.textContent = 'Fechar menu';
    document.documentElement.classList.add('menu-aberto');
    fundo.forEach((el) => el.setAttribute('inert', ''));
    menu.querySelector('a')?.focus({ preventScroll: true });
  };

  const fechar = ({ devolverFoco = true } = {}) => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    label.textContent = 'Abrir menu';
    document.documentElement.classList.remove('menu-aberto');
    fundo.forEach((el) => el.removeAttribute('inert'));
    setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, 320);
    if (devolverFoco) burger.focus({ preventScroll: true });
  };

  const aberto = () => burger.getAttribute('aria-expanded') === 'true';

  burger.addEventListener('click', () => (aberto() ? fechar() : abrir()));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) fechar({ devolverFoco: false }); });

  document.addEventListener('keydown', (e) => {
    if (!aberto()) return;
    if (e.key === 'Escape') { e.preventDefault(); fechar(); return; }
    if (e.key === 'Tab') {
      const els = focaveis();
      const i = els.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); els[els.length - 1].focus(); }
      else if (!e.shiftKey && i === els.length - 1) { e.preventDefault(); els[0].focus(); }
    }
  });

  // Ao virar desktop, garante menu fechado
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (mq) => {
    if (mq.matches && aberto()) fechar({ devolverFoco: false });
  });
}
