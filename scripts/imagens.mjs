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

// 4) Marca: logo quadrada oficial (MF + halteres) → logo circular, favicon e ícone do iPhone
const LARANJA = '#F29660'; // laranja claro da marca (mesmo de src/css/tokens.css)
const original = `${ORIG}/logo-quadrada.png`;
if (existsSync(original)) {
  // Recolore: mantém o branco da arte e troca o fundo laranja original pelo laranja claro
  const meta0 = await sharp(original).metadata();
  const alfaBranco = await sharp(original).removeAlpha().greyscale().linear(255 / (255 - 165), -165 * (255 / (255 - 165))).toColourspace('b-w').raw().toBuffer();
  const branco = await sharp({ create: { width: meta0.width, height: meta0.height, channels: 3, background: '#FFFFFF' } })
    .joinChannel(alfaBranco, { raw: { width: meta0.width, height: meta0.height, channels: 1 } }).png().toBuffer();
  const quadrada = await sharp({ create: { width: meta0.width, height: meta0.height, channels: 3, background: LARANJA } })
    .composite([{ input: branco }]).png().toBuffer();
  const { width: d } = await sharp(quadrada).metadata();
  const r = d / 2;
  const mascara = Buffer.from(`<svg width="${d}" height="${d}"><circle cx="${r}" cy="${r}" r="${r}" fill="#fff"/></svg>`);
  const circ = await sharp(quadrada).composite([{ input: mascara, blend: 'dest-in' }]).png().toBuffer();
  await sharp(circ).resize(512, 512).png({ compressionLevel: 9 }).toFile(`${BRAND}/logo-circular.png`);
  await sharp(circ).resize(240, 240).webp({ quality: 88 }).toFile(`${BRAND}/logo-circular-240.webp`);
  // Favicon: só o emblema "MF" (o texto some em 32px), num círculo laranja
  const s = d / 1080; // coordenadas medidas na arte de 1080px
  const emblema = await sharp(quadrada).extract({ left: Math.round(372 * s), top: Math.round(328 * s), width: Math.round(340 * s), height: Math.round(210 * s) }).toBuffer();
  const icone = async (tam, redondo) => {
    const fundo = Buffer.from(`<svg width="${tam}" height="${tam}">${redondo ? `<circle cx="${tam / 2}" cy="${tam / 2}" r="${tam / 2}" fill="${LARANJA}"/>` : `<rect width="${tam}" height="${tam}" fill="${LARANJA}"/>`}</svg>`);
    const marca = await sharp(emblema).resize(Math.round(tam * 0.72)).toBuffer();
    return sharp(fundo).composite([{ input: marca, gravity: 'center' }]).png();
  };
  await (await icone(32, true)).toFile('public/favicon-32.png');
  await (await icone(180, false)).toFile('public/apple-touch-icon.png');
  console.log('✔ logo circular 512px + favicon + apple-touch-icon');
}

const anexo1 = `${ORIG}/anexo1-hero.webp`;
if (existsSync(anexo1)) {
  await sharp(anexo1).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${BRAND}/og-image.jpg`);
  console.log('✔ og-image 1200x630');
}
