import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2020',
    cssMinify: true,
    assetsInlineLimit: 2048,
    rollupOptions: {
      // Só o index.html vai para produção (tokens.html é página de desenvolvimento)
      input: 'index.html',
    },
  },
});
