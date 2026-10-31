#!/usr/bin/env node
// Scans public/assets/{digital,print,social,leadership}, generates webp
// full/thumb versions next to each PNG, and merges the discovered files
// into public/assets/data/works.json. Also (re)generates the OG image.
//
// Usage: npm run assets

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC = join(ROOT, 'public');
const ASSETS = join(PUBLIC, 'assets');
const DATA_DIR = join(ASSETS, 'data');
const WORKS_JSON = join(DATA_DIR, 'works.json');

const BRANCH_DIRS = ['digital', 'print', 'social', 'leadership'];
const BRANCH_PREFIXES = {
  digital: 'vs-digital-',
  print: 'vs-print-',
  social: 'vs-social-',
  leadership: 'vs-lead-',
};

const FULL_MAX = 1600;
const THUMB_MAX = 600;

function humanize(id, branch) {
  const prefix = BRANCH_PREFIXES[branch];
  const stripped = id.startsWith(prefix) ? id.slice(prefix.length) : id;
  return stripped
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/** Resize + convert to webp, keeping transparency. Skips if the webp is already newer than the source. */
async function ensureWebp(srcPath, destPath, maxSize) {
  if (existsSync(destPath)) {
    const srcStat = statSync(srcPath);
    const destStat = statSync(destPath);
    if (destStat.mtimeMs >= srcStat.mtimeMs) {
      return false;
    }
  }
  await sharp(srcPath)
    .resize({ width: maxSize, height: maxSize, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(destPath);
  return true;
}

async function processBranch(branch) {
  const dir = join(ASSETS, branch);
  if (!existsSync(dir)) return [];

  const files = readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png'));
  const entries = [];

  for (const file of files) {
    const srcPath = join(dir, file);
    const id = basename(file, '.png');
    const fullWebp = join(dir, `${id}.webp`);
    const thumbWebp = join(dir, `${id}.thumb.webp`);

    const fullChanged = await ensureWebp(srcPath, fullWebp, FULL_MAX);
    const thumbChanged = await ensureWebp(srcPath, thumbWebp, THUMB_MAX);
    if (fullChanged) console.log(`  + ${branch}/${id}.webp`);
    if (thumbChanged) console.log(`  + ${branch}/${id}.thumb.webp`);

    entries.push({
      id,
      branch,
      file: `assets/${branch}/${file}`,
    });
  }

  return entries;
}

/** Add new works, drop ones whose file is gone, never overwrite title/meta/featured/order on existing entries. */
function mergeWorks(existing, discovered) {
  const byId = new Map(existing.map(w => [w.id, w]));
  const seen = new Set();
  const merged = [];
  let nextOrder = existing.reduce((max, w) => Math.max(max, w.order ?? 0), 0) + 10;

  for (const d of discovered) {
    seen.add(d.id);
    const prev = byId.get(d.id);
    if (prev) {
      merged.push({ ...prev, branch: d.branch, file: d.file });
    } else {
      merged.push({
        id: d.id,
        branch: d.branch,
        title: humanize(d.id, d.branch),
        meta: '',
        file: d.file,
        featured: false,
        order: nextOrder,
      });
      nextOrder += 10;
      console.log(`  + works.json: added "${d.id}"`);
    }
  }

  const removed = existing.filter(w => !seen.has(w.id));
  for (const r of removed) {
    console.log(`  - works.json: removed "${r.id}" (file no longer exists)`);
  }

  return merged;
}

async function generateOgImage() {
  const ogDir = join(ASSETS, 'og');
  const outPath = join(ogDir, 'og-image.png');
  const heroPath = join(PUBLIC, 'x_red.png');

  if (!existsSync(heroPath)) {
    console.warn('  ! x_red.png not found — skipping OG image generation');
    return;
  }

  mkdirSync(ogDir, { recursive: true });

  const WIDTH = 1200;
  const HEIGHT = 630;
  const BG = '#171717';
  const TEXT = '#f8f4ec';
  const GREEN = '#7ed957';
  const MARK_SIZE = 480;

  const mark = await sharp(heroPath)
    .resize({ width: MARK_SIZE, height: MARK_SIZE, fit: 'inside' })
    .toBuffer();

  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${BG}"/>
      <text x="64" y="270" font-family="'Fira Code', ui-monospace, monospace" font-size="54" font-weight="700" fill="${TEXT}">hi! i'm maria,</text>
      <text x="64" y="336" font-family="'Fira Code', ui-monospace, monospace" font-size="54" font-weight="700" fill="${TEXT}">nice to meet you.</text>
      <text x="64" y="400" font-family="'Fira Code', ui-monospace, monospace" font-size="26" fill="${GREEN}">jack of all trades, master of puppets</text>
    </svg>`;

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: mark,
        left: WIDTH - MARK_SIZE - 60,
        top: Math.round((HEIGHT - MARK_SIZE) / 2),
      },
    ])
    .png()
    .toFile(outPath);

  console.log('  + assets/og/og-image.png');
}

async function main() {
  mkdirSync(DATA_DIR, { recursive: true });

  const existing = existsSync(WORKS_JSON)
    ? JSON.parse(readFileSync(WORKS_JSON, 'utf-8'))
    : [];

  console.log('scanning branch folders...');
  let discovered = [];
  for (const branch of BRANCH_DIRS) {
    discovered = discovered.concat(await processBranch(branch));
  }

  console.log('merging works.json...');
  const merged = mergeWorks(existing, discovered);
  writeFileSync(WORKS_JSON, JSON.stringify(merged, null, 2) + '\n');
  console.log(
    `works.json: ${merged.length} entries (${merged.filter(w => w.featured).length} featured)`
  );

  console.log('generating OG image...');
  await generateOgImage();

  console.log('done.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
