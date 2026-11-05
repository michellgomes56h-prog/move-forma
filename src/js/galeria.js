/* Lightbox próprio e leve: <dialog> nativo (foco preso, fundo inerte, ESC fecha),
   setas do teclado, botões, swipe no celular. Funciona com fotos (data-full) ou placeholders. */

export function initGaleria() {
  const grade = document.querySelector('[data-galeria]');
  const dlg = document.querySelector('[data-lightbox]');
  if (!grade || !dlg || typeof dlg.showModal !== 'function') return;

  const palco = dlg.querySelector('[data-lb-palco]');
  const contador = dlg.querySelector('[data-lb-contador]');
  const botoes = [...grade.querySelectorAll('[data-foto]')];
  let atual = 0;
  let origem = null;

  const conteudo = (btn) => {
    if (btn.dataset.full) {
      const img = document.createElement('img');
      img.src = btn.dataset.full;
      img.alt = btn.querySelector('img')?.alt || '';
      img.decoding = 'async';
      return img;
    }
    const img = btn.querySelector('img');
    if (img) { const c = img.cloneNode(); c.removeAttribute('loading'); c.sizes = '92vw'; return c; }
    return btn.querySelector('.placeholder').cloneNode(true);
  };

  const mostra = (i) => {
    atual = (i + botoes.length) % botoes.length;
    palco.classList.remove('is-trocando');
    palco.replaceChildren(conteudo(botoes[atual]));
    void palco.offsetWidth;
    palco.classList.add('is-trocando');
    contador.textContent = `${atual + 1} / ${botoes.length}`;
  };

  const abre = (i, btn) => {
    origem = btn;
    mostra(i);
    dlg.showModal();
    document.documentElement.classList.add('sem-rolagem'); // trava a rolagem do fundo
    dlg.querySelector('[data-lb-fechar]').focus();
  };

  botoes.forEach((b, i) => b.addEventListener('click', () => abre(i, b)));
  dlg.querySelector('[data-lb-fechar]').addEventListener('click', () => dlg.close());
  dlg.querySelector('[data-lb-ant]').addEventListener('click', () => mostra(atual - 1));
  dlg.querySelector('[data-lb-prox]').addEventListener('click', () => mostra(atual + 1));
  dlg.addEventListener('close', () => {
    document.documentElement.classList.remove('sem-rolagem');
    origem?.focus({ preventScroll: true });
  });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); mostra(atual - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); mostra(atual + 1); }
  });
  // clique fora da foto fecha
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target === palco) dlg.close(); });

  // swipe
  let x0 = null, y0 = null;
  palco.addEventListener('pointerdown', (e) => { x0 = e.clientX; y0 = e.clientY; });
  palco.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) mostra(atual + (dx < 0 ? 1 : -1));
  });
}
