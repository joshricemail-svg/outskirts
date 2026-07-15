/**
 * Generate the site's raster brand assets from the real Bodoni Moda outlines:
 *   - public/og.png        1200x630  signboard Open Graph / Twitter card
 *   - app/apple-icon.png   180x180   apple touch icon (O tile, inner rule kept)
 *   - app/favicon.ico      16 + 32   classic favicon (O tile, inner rule dropped)
 *
 * Glyphs are converted to SVG <path> data with opentype.js (so no font needs to
 * be installed at render time) and rasterized with sharp. These outputs are
 * committed, so `next build` never runs this script. Regenerate with:
 *   npm run gen:images
 */
import opentype from 'opentype.js';
import sharp from 'sharp';
import { deflateSync } from 'node:zlib';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const bodoni700 = opentype.loadSync(join(root, 'assets/fonts/bodoni-700.woff'));
const bodoni500 = opentype.loadSync(join(root, 'assets/fonts/bodoni-500.woff'));

const CREAM = '#f4f1e8';

/**
 * Lay a string out as SVG path data with per-glyph tracking, horizontally
 * centered on `cx` and vertically centered on `cy` (by glyph bounding box).
 */
function centeredText(font, text, fontSize, tracking, cx, cy) {
  const combined = new opentype.Path();
  let x = 0;
  for (const ch of text) {
    const glyphPath = font.getPath(ch, x, 0, fontSize);
    combined.commands.push(...glyphPath.commands);
    x += font.getAdvanceWidth(ch, fontSize) + tracking;
  }
  const width = x - tracking;
  const bb = combined.getBoundingBox();
  const tx = cx - width / 2;
  const ty = cy - (bb.y1 + bb.y2) / 2;
  return `<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})"><path d="${combined.toPathData(2)}" fill="${CREAM}"/></g>`;
}

async function toPng(svg, width, height) {
  return sharp(Buffer.from(svg)).resize(width, height).png().toBuffer();
}

// ---------- Open Graph card ----------
// The neon sign is the brand logo, so the social card is that image, letterboxed
// onto a 1200x630 near-black field (the sign's own black edges hide the seam).
async function buildOg() {
  const W = 1200;
  const H = 630;
  // JPEG: it's a photograph, so this is ~10x smaller than PNG for the same look.
  const jpg = await sharp(join(root, 'public/hero-neon.jpg'))
    .resize(W, H, { fit: 'contain', background: { r: 5, g: 5, b: 6 } })
    .jpeg({ quality: 86, progressive: true, mozjpeg: true })
    .toBuffer();
  writeFileSync(join(root, 'public/og.jpg'), jpg);
  console.log(`Wrote public/og.jpg (${Math.round(jpg.length / 1024)}KB)`);
}

// ---------- O tile (shared shape) ----------
function oTileSvg(size, { innerRule }) {
  const stroke = size * 0.06;
  const rx = size * 0.16;
  const inset = stroke / 2;
  const oSize = size * 0.72;
  const innerRuleRect = innerRule
    ? `<rect x="${size * 0.11}" y="${size * 0.11}" width="${size * 0.78}" height="${size * 0.78}" rx="${size * 0.09}" fill="none" stroke="${CREAM}" stroke-opacity="0.5" stroke-width="${Math.max(1, size * 0.011)}"/>`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect x="${inset}" y="${inset}" width="${size - stroke}" height="${size - stroke}" rx="${rx}" fill="#1a2c50" stroke="${CREAM}" stroke-width="${stroke}"/>
  ${innerRuleRect}
  ${centeredText(bodoni700, 'O', oSize, 0, size / 2, size / 2)}
</svg>`;
}

async function buildAppleIcon() {
  const png = await toPng(oTileSvg(180, { innerRule: true }), 180, 180);
  writeFileSync(join(root, 'app/apple-icon.png'), png);
  console.log(`Wrote app/apple-icon.png (${png.length} bytes)`);
}

// ---------- favicon.ico (PNG-based) ----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const pngChunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
};
const encodePng = (rgba, size) => {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    rgba.copy(raw, y * (size * 4 + 1) + 1, y * size * 4, (y + 1) * size * 4);
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, pngChunk('IHDR', ihdr), pngChunk('IDAT', idat), pngChunk('IEND', Buffer.alloc(0))]);
};
const encodeIco = (images) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const entries = [];
  const blobs = [];
  let offset = 6 + images.length * 16;
  for (const { size, png } of images) {
    const e = Buffer.alloc(16);
    e[0] = size >= 256 ? 0 : size;
    e[1] = size >= 256 ? 0 : size;
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    blobs.push(png);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...blobs]);
};

async function buildFavicon() {
  const images = [];
  for (const size of [16, 32]) {
    // Render the tile through sharp to get anti-aliased RGBA, then re-encode as
    // a PNG we control the bytes of, and pack into the ICO.
    const rgba = await sharp(Buffer.from(oTileSvg(size, { innerRule: false })))
      .resize(size, size)
      .ensureAlpha()
      .raw()
      .toBuffer();
    images.push({ size, png: encodePng(rgba, size) });
  }
  const ico = encodeIco(images);
  writeFileSync(join(root, 'app/favicon.ico'), ico);
  console.log(`Wrote app/favicon.ico (${ico.length} bytes, sizes: 16, 32)`);
}

await buildOg();
await buildAppleIcon();
await buildFavicon();
console.log('Done.');
