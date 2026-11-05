/* Hero: subtítulo aparecendo letra por letra.
   O texto original fica no DOM (leitores de tela/SEO); as letras animadas são só visuais (::before + aria-hidden). */

export function initHero() {
  document.querySelectorAll('[data-split]').forEach((el) => {
    const texto = el.textContent.trim();
    let i = 0;
    const visual = document.createElement('span');
    visual.setAttribute('aria-hidden', 'true');
    texto.split(' ').forEach((palavra, idx, arr) => {
      const w = document.createElement('span');
      w.className = 'w';
      for (const ch of palavra) {
        const c = document.createElement('span');
        c.className = 'c';
        c.style.setProperty('--i', i++);
        c.dataset.c = ch; // letra desenhada via ::before → o texto do H1 não duplica (SEO)
        w.appendChild(c);
      }
      visual.appendChild(w);
      if (idx < arr.length - 1) { visual.appendChild(document.createTextNode(' ')); i++; }
    });
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = texto;
    el.replaceChildren(sr, visual);
    el.classList.add('is-split');
  });
}
