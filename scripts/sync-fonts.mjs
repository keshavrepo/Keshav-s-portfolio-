import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Font pipeline (ARCHITECTURE §12): variable fonts travel from their npm
 * packages into the design system so builds are hermetic — no Google-font
 * fetch at build or run time. Missing required faces fail loudly; an
 * unavailable italic is reported and skipped rather than synthesized.
 *
 * Card instances: the social card renderer (Satori via next/og) cannot
 * parse woff2. The pipeline therefore also writes static default-cut TTF
 * companions (fraunces-card.ttf / inter-card.ttf) converted in-process
 * with fonteditor-core (pure JS + embedded wasm — hermetic too). These
 * power `src/app/og-card.tsx` and nothing else; a failed conversion is a
 * warning, never a build failure (the card falls back gracefully).
 */
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const destination = join(root, 'src', 'design-system', 'fonts');

const FACES = [
  {
    to: 'fraunces-var.woff2',
    required: true,
    candidates: [
      '@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2',
      '@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2',
    ],
  },
  {
    to: 'fraunces-var-italic.woff2',
    required: false,
    candidates: [
      '@fontsource-variable/fraunces/files/fraunces-latin-full-italic.woff2',
      '@fontsource-variable/fraunces/files/fraunces-latin-wght-italic.woff2',
    ],
  },
  {
    to: 'inter-var.woff2',
    required: true,
    candidates: ['@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'],
  },
  {
    to: 'inter-var-italic.woff2',
    required: false,
    candidates: ['@fontsource-variable/inter/files/inter-latin-wght-italic.woff2'],
  },
];

mkdirSync(destination, { recursive: true });

let failures = 0;

for (const face of FACES) {
  const source = face.candidates
    .map((candidate) => join(root, 'node_modules', candidate))
    .find((candidate) => existsSync(candidate));

  if (!source) {
    if (face.required) {
      console.error(`[fonts] REQUIRED face missing: ${face.candidates.join(' | ')}`);
      failures += 1;
    } else {
      console.info(`[fonts] optional face unavailable, skipped: ${face.to}`);
    }
    continue;
  }

  const target = join(destination, face.to);
  copyFileSync(source, target);
  const kb = (statSync(target).size / 1024).toFixed(1);
  console.info(`[fonts] ${face.to} <- ${source.split('node_modules/')[1]} (${kb} kB)`);
}

if (failures > 0) {
  console.error(`[fonts] ${failures} required face(s) missing — aborting.`);
  process.exit(1);
}

/* Static default-cut TTFs for the social card renderer (see header). */
const CARD_INSTANCES = [
  ['fraunces-var.woff2', 'fraunces-card.ttf'],
  ['inter-var.woff2', 'inter-card.ttf'],
];

try {
  const require = createRequire(import.meta.url);
  const { Font, woff2 } = require('fonteditor-core');
  await woff2.init();
  for (const [from, to] of CARD_INSTANCES) {
    const source = join(destination, from);
    if (!existsSync(source)) throw new Error(`missing source ${from}`);
    const font = Font.create(readFileSync(source), { type: 'woff2' });
    const ttf = font.write({ type: 'ttf' });
    const target = join(destination, to);
    writeFileSync(target, Buffer.from(ttf));
    console.info(`[fonts] ${to} <- ${from} (${(statSync(target).size / 1024).toFixed(1)} kB)`);
  }
} catch (error) {
  console.warn(`[fonts] card TTF conversion skipped: ${error.message}`);
}

console.info('[fonts] pipeline complete');
