// Converts the original property photographs in /assets-src into responsive
// WebP renditions in /public/images and writes a manifest the <Img> component
// reads for srcset, intrinsic size and placeholder colour.
// Never upscales: widths larger than the original are skipped.
import { readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets-src');
const outDir = path.join(root, 'public', 'images');
const manifestPath = path.join(root, 'src', 'data', 'images.json');
const WIDTHS = [480, 800, 1200, 1600, 1920];

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const manifest = {};

for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, '');
  const input = sharp(path.join(srcDir, file)).rotate();
  const { width, height } = await input.metadata();
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), width])];

  for (const w of widths) {
    await input
      .clone()
      .resize({ width: w, withoutEnlargement: true })
      .flatten({ background: '#f6f1e7' })
      .webp({ quality: 78, effort: 5 })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }

  const { dominant } = await input.clone().stats();
  const hex = '#' + [dominant.r, dominant.g, dominant.b].map((v) => v.toString(16).padStart(2, '0')).join('');
  manifest[name] = { width, height, widths, color: hex };
  console.log(`${name}: ${width}x${height} -> ${widths.join(', ')}`);
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${files.length} images written to public/images, manifest at src/data/images.json`);
