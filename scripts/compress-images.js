import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

import { resolve } from 'path';
const TARGET_DIR = resolve(process.cwd(), 'src/assets/work');
const MAX_LONG_EDGE = 2400;
const SIZE_THRESHOLD = 2 * 1024 * 1024; // 2MB

async function findPngs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findPngs(full));
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === '.png') {
      files.push(full);
    }
  }
  return files;
}

async function formatBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

async function main() {
  const files = await findPngs(TARGET_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const file of files) {
    const { size } = await stat(file);
    totalBefore += size;

    if (size < SIZE_THRESHOLD) {
      totalAfter += size;
      skipped++;
      continue;
    }

    const meta = await sharp(file).metadata();
    const longestEdge = Math.max(meta.width, meta.height);
    const needsResize = longestEdge > MAX_LONG_EDGE;

    let pipeline = sharp(file);
    if (needsResize) {
      pipeline = pipeline.resize(
        meta.width >= meta.height ? MAX_LONG_EDGE : null,
        meta.height > meta.width ? MAX_LONG_EDGE : null,
        { fit: 'inside', withoutEnlargement: true }
      );
    }

    const compressed = await pipeline
      .png({ compressionLevel: 9, effort: 10 })
      .toBuffer();

    const sizeBefore = await formatBytes(size);
    const sizeAfter = await formatBytes(compressed.length);
    const dims = needsResize ? ` (resized from ${meta.width}×${meta.height})` : '';

    await import('fs').then(fs =>
      new Promise((res, rej) =>
        fs.writeFile(file, compressed, err => err ? rej(err) : res())
      )
    );

    totalAfter += compressed.length;
    processed++;
    const rel = file.replace(TARGET_DIR + '/', '');
    console.log(`✓ ${rel}: ${sizeBefore} → ${sizeAfter}${dims}`);
  }

  console.log('\n─────────────────────────────────────────');
  console.log(`Processed : ${processed} files`);
  console.log(`Skipped   : ${skipped} files (already under 2MB)`);
  console.log(`Before    : ${await formatBytes(totalBefore)}`);
  console.log(`After     : ${await formatBytes(totalAfter)}`);
  console.log(`Saved     : ${await formatBytes(totalBefore - totalAfter)}`);
}

main().catch(err => { console.error(err); process.exit(1); });
