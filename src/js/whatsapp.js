import { NUMERO_WHATSAPP, MENSAGENS } from './config.js';

const somenteDigitos = (s) => String(s).replace(/\D/g, '');

/** Único helper que monta o link do WhatsApp. */
export function linkWhatsApp(chaveOuTexto = 'padrao') {
  const texto = MENSAGENS[chaveOuTexto] ?? chaveOuTexto;
  return `https://wa.me/${somenteDigitos(NUMERO_WHATSAPP)}?text=${encodeURIComponent(texto)}`;
}

/** Liga todo elemento com [data-wa] ao WhatsApp.
 *  <a data-wa="stepdance">…</a> → mensagem do Step Dance.
 *  Desktop: nova aba. Celular: wa.me abre direto o app (mesma aba, sem aba órfã). */
export function initWhatsApp(root = document) {
  const toque = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  root.querySelectorAll('[data-wa]').forEach((el) => {
    el.setAttribute('href', linkWhatsApp(el.dataset.wa || 'padrao'));
    if (toque) {
      el.removeAttribute('target');
    } else {
      el.setAttribute('target', '_blank');
    }
    el.setAttribute('rel', 'noopener');
  });
}
