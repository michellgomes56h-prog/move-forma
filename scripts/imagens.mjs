/* Gera as imagens otimizadas do site (AVIF/WebP/JPG em vários tamanhos).
   Uso: npm run imagens
   Originais ficam em /assets-originais (fora do /public, não vão para o site). */
import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ORIG = 'assets-originais';
const FOTOS = 'public/fotos';
const BRAND = 'public/brand';
await mkdir(FOTOS, { recursive: true });
await mkdir(BRAND, { recursive: true });

async function variantes(src, nome, larguras) {
  const meta = await sharp(src).metadata();
  for (const w of larguras.filter((w) => w <= meta.width)) {
    const base = sharp(src).resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${FOTOS}/${nome}-${w}.avif`);
    await base.clone().webp({ quality: 74 }).toFile(`${FOTOS}/${nome}-${w}.webp`);
    await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${FOTOS}/${nome}-${w}.jpg`);
  }
  console.log('✔', nome, meta.width + 'x' + meta.height);
}

// 1) Hero (fundo da academia, sem os textos embutidos)
if (existsSync(`${ORIG}/hero.png`)) await variantes(`${ORIG}/hero.png`, 'hero', [800, 1280, 1672, 2400]);

// 2) Sobre
for (const ext of ['jpg', 'jpeg', 'png', 'webp']) {
  if (existsSync(`${ORIG}/sobre.${ext}`)) await variantes(`${ORIG}/sobre.${ext}`, 'sobre', [600, 900, 1400]);
}

// 3) Galeria: assets-originais/galeria/*.jpg → galeria-01, galeria-02…
if (existsSync(`${ORIG}/galeria`)) {
  const arquivos = (await readdir(`${ORIG}/galeria`)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  let i = 1;
  for (const f of arquivos) await variantes(path.join(ORIG, 'galeria', f), `galeria-${String(i++).padStart(2, '0')}`, [480, 960, 1600]);
}

// 4) Marca: logo circular recortada do print do Instagram (anexo 2) + favicons + OG
const insta = `${ORIG}/anexo2-instagram.png`;
if (existsSync(insta)) {
  const { data, info } = await sharp(insta).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let x0 = 1e9, y0 = 1e9, x1 = 0, y1 = 0;
  for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 3;
    if (Math.abs(data[i] - 228) < 14 && Math.abs(data[i + 1] - 112) < 14 && Math.abs(data[i + 2] - 42) < 14) {
      x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
    }
  }
  const d = Math.min(x1 - x0, y1 - y0) + 1;
  const r = d / 2;
  const mascara = Buffer.from(`<svg width="${d}" height="${d}"><circle cx="${r}" cy="${r}" r="${r - 0.5}" fill="#fff"/></svg>`);
  const circ = await sharp(insta).extract({ left: x0, top: y0, width: d, height: d })
    .composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
  await sharp(circ).toFile(`${BRAND}/logo-circular.png`);
  await sharp(circ).resize(32, 32).toFile('public/favicon-32.png');
  await sharp(circ).resize(180, 180).flatten({ background: '#E8702A' }).toFile('public/apple-touch-icon.png');
  console.log('✔ logo circular', d + 'px (recorte do print — trocar pelo arquivo original em alta)');
}

const anexo1 = `${ORIG}/anexo1-hero.webp`;
if (existsSync(anexo1)) {
  await sharp(anexo1).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${BRAND}/og-image.jpg`);
  console.log('✔ og-image 1200x630');
}
