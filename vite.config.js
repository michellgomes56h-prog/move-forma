import { defineConfig } from 'vite';
import { NUMERO_WHATSAPP } from './src/js/config.js';

export default defineConfig({
  plugins: [{
    // O número do WhatsApp do JSON-LD (index.html) vem do mesmo config.js usado pelos botões
    name: 'move-forma-config',
    transformIndexHtml: (html) => html.replaceAll('{{NUMERO_WHATSAPP}}', String(NUMERO_WHATSAPP).replace(/\D/g, '') || '{{NUMERO_WHATSAPP}}'),
  }],
  build: {
    target: 'es2020',
    cssMinify: true,
    assetsInlineLimit: 2048,
    rollupOptions: { input: 'index.html' }, // tokens.html é só para desenvolvimento
  },
});
