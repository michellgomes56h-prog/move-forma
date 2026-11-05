# Move Forma – Site oficial

Site de página única (Vite + HTML/CSS/JS puro) do estúdio **Move Forma – Treinamento Personalizado** (Giruá/RS).
Objetivo único: levar o visitante a clicar em **Agendar no WhatsApp**.

## Rodar / publicar
```bash
npm install
npm run dev        # desenvolvimento (http://localhost:5173)
npm run build      # gera /dist (estático, pronto para a Vercel)
npm run imagens    # otimiza fotos e logos de /assets-originais → /public
```
Na Vercel: importe o repositório, framework “Vite”, sem configurações extras (`vercel.json` já define build e cache).

## O que preencher (tudo num lugar só)
| O quê | Onde |
|---|---|
| Número do WhatsApp (`55DDDNUMERO`) | `src/js/config.js` → `NUMERO_WHATSAPP` (vale para todos os botões **e** para o JSON-LD) |
| Horários de atendimento | `src/js/config.js` → `HORARIOS` (enquanto vazio, o site mostra “Consulte os horários pelo WhatsApp”) |
| Fotos da galeria (8) | `assets-originais/galeria/01.jpg…08.jpg` → `npm run imagens` → troque os blocos marcados `TROCAR FOTO` no `index.html` |
| Foto da seção Sobre | `assets-originais/sobre.jpg` → `npm run imagens` → bloco `TROCAR FOTO` da seção Sobre |
| Foto real da hero (opcional) | substitua `assets-originais/hero.png` (hoje: anexo 1 sem os textos) → `npm run imagens` |
| Logo horizontal original (opcional) | `public/brand/logo-horizontal.svg` (hoje: vetorizada do anexo 1) |
| Domínio final | `index.html` (canonical, og:image, JSON-LD), `public/robots.txt`, `public/sitemap.xml` — hoje `moveforma.com.br` |

## Estrutura
```
index.html               página única (seções na ordem do briefing)
src/css/tokens.css       cores, tipografia, espaços, brilhos, movimento
src/css/sections/*.css   um arquivo por seção
src/js/config.js         WhatsApp, horários, endereço, mensagens
src/js/*.js              um módulo por funcionalidade (header, hero, galeria, mapa…)
public/brand, public/fotos, public/fonts
assets-originais/        originais das imagens (não vão para o site)
scripts/imagens.mjs      gera AVIF/WebP/JPG, favicon e logo circular
```
