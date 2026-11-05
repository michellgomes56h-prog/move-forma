import { HORARIOS } from './config.js';

/* Horários vindos do config.js. Enquanto não forem preenchidos, mostra um aviso neutro. */
export function initHorarios() {
  const dl = document.querySelector('[data-horarios]');
  if (!dl) return;
  const validos = HORARIOS.filter((h) => h.dias && !h.dias.includes('{{'));
  if (!validos.length) {
    dl.innerHTML = '<dt class="sr-only">Horários</dt><dd class="pendente">Consulte os horários pelo WhatsApp.</dd>';
    return;
  }
  dl.replaceChildren(...validos.flatMap((h) => {
    const dt = document.createElement('dt'); dt.textContent = h.dias;
    const dd = document.createElement('dd'); dd.textContent = h.horas;
    return [dt, dd];
  }));
}

/* Botão flutuante: aparece depois da hero e some sobre o rodapé (não cobre links). */
export function initFab() {
  const fab = document.querySelector('[data-fab]');
  const hero = document.querySelector('.hero');
  const rodape = document.querySelector('.rodape');
  if (!fab || !hero || !('IntersectionObserver' in window)) return;
  let passouHero = false, noRodape = false;
  const atualiza = () => {
    const visivel = passouHero && !noRodape;
    fab.classList.toggle('is-visivel', visivel);
    fab.tabIndex = visivel ? 0 : -1;
    fab.setAttribute('aria-hidden', String(!visivel));
  };
  new IntersectionObserver(([e]) => { passouHero = !e.isIntersecting; atualiza(); }, { threshold: 0, rootMargin: '-60% 0px 0px 0px' }).observe(hero);
  if (rodape) new IntersectionObserver(([e]) => { noRodape = e.isIntersecting; atualiza(); }).observe(rodape);
  atualiza();
}

/* Link ativo no menu conforme a seção na tela */
export function initNavAtiva() {
  const links = [...document.querySelectorAll('.header__nav a[href^="#"]')];
  const mapa = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      mapa.get(e.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  mapa.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
