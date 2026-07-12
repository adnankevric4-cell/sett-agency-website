import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = join(__dir, '..');
const pub   = join(root, 'public');

// ── 1. Build composite SVG (white square + centred wordmark) ──────────────────

const vbW = 471.13;
const vbH = 470.16;
const SIZE = 512;
const PAD  = 0.22; // 22% each side

const markW = SIZE * (1 - PAD * 2);          // 286.72
const markH = markW * (vbH / vbW);           // ~286.13
const markX = SIZE * PAD;                    // 112.64
const markY = (SIZE - markH) / 2;            // ~112.94
const scale = markW / vbW;

// Read and extract path data from the symbol SVG
const rawSvg = readFileSync(join(root, 'src/assets/brand/sett-symbol.svg'), 'utf8');
const pathMatches = [...rawSvg.matchAll(/<path\s+d="([^"]+)"/g)];
const pathsHtml = pathMatches
  .map(m => `  <path d="${m[1]}" fill="#111111"/>`)
  .join('\n');

const compositeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="#FFFFFF"/>
  <g transform="translate(${markX.toFixed(3)},${markY.toFixed(3)}) scale(${scale.toFixed(6)})">
${pathsHtml}
  </g>
</svg>`;

// ── 2. Render sizes via sharp ─────────────────────────────────────────────────

async function renderPng(size) {
  return sharp(Buffer.from(compositeSvg))
    .resize(size, size)
    .png()
    .toBuffer();
}

// ── 3. Minimal ICO writer (embeds PNGs, supports modern browsers) ─────────────
// ICO format: 6-byte header + N*16-byte directory entries + N PNG blobs

function buildIco(pngBuffers) {
  const n = pngBuffers.length;

  // Header: reserved(2) + type(2)=1 + count(2)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(n, 4);

  const dirSize   = n * 16;
  const headerLen = 6 + dirSize;

  // Calculate offsets
  const offsets = [];
  let offset = headerLen;
  for (const buf of pngBuffers) {
    offsets.push(offset);
    offset += buf.length;
  }

  // Directory entries (16 bytes each)
  const dir = Buffer.alloc(dirSize);
  pngBuffers.forEach((buf, i) => {
    // Read actual PNG dimensions
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    // ICO uses 0 to mean 256 for sizes ≥ 256
    dir.writeUInt8(w >= 256 ? 0 : w, i * 16 + 0);
    dir.writeUInt8(h >= 256 ? 0 : h, i * 16 + 1);
    dir.writeUInt8(0, i * 16 + 2);   // color count
    dir.writeUInt8(0, i * 16 + 3);   // reserved
    dir.writeUInt16LE(1, i * 16 + 4); // planes
    dir.writeUInt16LE(32, i * 16 + 6); // bit count
    dir.writeUInt32LE(buf.length, i * 16 + 8);
    dir.writeUInt32LE(offsets[i], i * 16 + 12);
  });

  return Buffer.concat([header, dir, ...pngBuffers]);
}

// ── 4. Generate everything ────────────────────────────────────────────────────

async function main() {
  console.log('Rendering favicons…');

  const [px16, px32, px48, px180, px192, px512] = await Promise.all([
    renderPng(16),
    renderPng(32),
    renderPng(48),
    renderPng(180),
    renderPng(192),
    renderPng(512),
  ]);

  const ico = buildIco([px16, px32, px48]);

  writeFileSync(join(pub, 'favicon.ico'),               ico);
  writeFileSync(join(pub, 'favicon-16x16.png'),         px16);
  writeFileSync(join(pub, 'favicon-32x32.png'),         px32);
  writeFileSync(join(pub, 'apple-touch-icon.png'),      px180);
  writeFileSync(join(pub, 'android-chrome-192x192.png'), px192);
  writeFileSync(join(pub, 'android-chrome-512x512.png'), px512);

  // Write composite SVG for reference (also used as fallback favicon)
  writeFileSync(join(pub, 'favicon.svg'), compositeSvg);

  console.log('Done. Files written to public/:');
  console.log('  favicon.ico (16+32+48)');
  console.log('  favicon-16x16.png');
  console.log('  favicon-32x32.png');
  console.log('  apple-touch-icon.png (180x180)');
  console.log('  android-chrome-192x192.png');
  console.log('  android-chrome-512x512.png');
  console.log('  favicon.svg');
}

main().catch(err => { console.error(err); process.exit(1); });
