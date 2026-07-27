/**
 * Generates local SVG placeholder images into public/img/placeholders/.
 *
 * Why local: the previous build pointed every image at picsum.photos, so the
 * site could not render offline and nobody ever checked real photos against
 * the aspect ratios the CSS assumed.
 *
 * Each placeholder states its intended subject and ratio, so an unreplaced
 * image is obvious on sight and correctly shaped for the real photo.
 *
 * Run: npm run placeholders
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const OUT_DIR = fileURLToPath(new URL('../public/img/placeholders/', import.meta.url));

/** Ratios used by the layout. Keep in sync with .ratio-* in _base.scss. */
const RATIOS = {
  hero: [1600, 700],
  wide: [1200, 675],
  card: [900, 600],
  square: [800, 800],
  portrait: [720, 900],
  banner: [1600, 500],
};

/**
 * name → [subject label, ratio key]
 * Mirrors the media checklist in INTAKE.md section 6.
 */
const IMAGES = {
  'hero-campus':          ['Students on the main lawn', 'hero'],
  'hero-primary':         ['Primary pupils in class', 'hero'],
  'hero-secondary':       ['Secondary students in a lab', 'hero'],
  'page-banner':          ['Campus exterior', 'banner'],
  'campus-exterior':      ['Campus exterior & gate', 'wide'],
  'campus-grounds':       ['School grounds', 'card'],
  'primary-classroom':    ['Primary classroom in use', 'card'],
  'primary-reading':      ['Reading corner', 'card'],
  'primary-art':          ['Art & craft lesson', 'card'],
  'primary-playground':   ['Playground at break', 'card'],
  'secondary-classroom':  ['Secondary classroom', 'card'],
  'secondary-lab':        ['Science laboratory', 'card'],
  'secondary-ict':        ['ICT suite', 'card'],
  'secondary-seminar':    ['Senior seminar group', 'card'],
  'library':              ['Library', 'card'],
  'sports-field':         ['Sports field', 'card'],
  'sports-team':          ['School team', 'card'],
  'music-room':           ['Music room', 'card'],
  'assembly':             ['Whole-school assembly', 'wide'],
  'event-prizegiving':    ['Prize giving', 'card'],
  'event-culture-day':    ['Culture day', 'card'],
  'welcome-head':         ['Head of School portrait', 'portrait'],
  'staff-portrait-1':     ['Staff portrait', 'portrait'],
  'staff-portrait-2':     ['Staff portrait', 'portrait'],
  'staff-portrait-3':     ['Staff portrait', 'portrait'],
  'staff-portrait-4':     ['Staff portrait', 'portrait'],
  'parent-1':             ['Parent portrait', 'square'],
  'parent-2':             ['Parent portrait', 'square'],
  'alumnus-1':            ['Alumnus portrait', 'square'],
  'news-generic':         ['News image', 'card'],
  'og-default':           ['Northgate Academy', 'wide'],
};

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function svg(label, w, h) {
  const ratio = simplifyRatio(w, h);
  // Scale text with the image so small placeholders stay readable
  const titleSize = Math.round(Math.min(w, h) * 0.062);
  const metaSize = Math.round(Math.min(w, h) * 0.038);
  const iconSize = Math.round(Math.min(w, h) * 0.13);
  const cy = h / 2;

  // Deliberately cheap to rasterise: flat fill plus a linear gradient, no
  // repeating <pattern>. A fine hatch across a 1600x700 canvas is expensive to
  // paint and made full-page screenshots time out.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Placeholder: ${escape(label)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d3ddee"/>
      <stop offset="1" stop-color="#b3c4de"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect x="8" y="8" width="${w - 16}" height="${h - 16}" fill="none" stroke="#5a7cba" stroke-width="3" stroke-dasharray="14 10"/>
  <g transform="translate(${w / 2} ${cy - iconSize * 1.1})" fill="none" stroke="#2a4880" stroke-width="${Math.max(2, iconSize * 0.07)}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="${-iconSize / 2}" y="${-iconSize * 0.34}" width="${iconSize}" height="${iconSize * 0.72}" rx="${iconSize * 0.1}"/>
    <circle cx="0" cy="0" r="${iconSize * 0.2}"/>
    <path d="M${-iconSize * 0.18} ${-iconSize * 0.34} l${iconSize * 0.09} ${-iconSize * 0.13} h${iconSize * 0.18} l${iconSize * 0.09} ${iconSize * 0.13}"/>
  </g>
  <text x="${w / 2}" y="${cy + titleSize * 0.9}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${titleSize}" font-weight="600" fill="#0f1d3d">${escape(label)}</text>
  <text x="${w / 2}" y="${cy + titleSize * 0.9 + metaSize * 1.9}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${metaSize}" font-weight="600" fill="#2a4880" letter-spacing="2">PLACEHOLDER · ${ratio} · ${w}×${h}</text>
</svg>
`;
}

function simplifyRatio(w, h) {
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

await mkdir(OUT_DIR, { recursive: true });

let count = 0;
for (const [name, [label, ratioKey]] of Object.entries(IMAGES)) {
  const dims = RATIOS[ratioKey];
  if (!dims) throw new Error(`Unknown ratio "${ratioKey}" for image "${name}"`);
  const [w, h] = dims;
  await writeFile(path.join(OUT_DIR, `${name}.svg`), svg(label, w, h), 'utf8');
  count++;
}

console.log(`Generated ${count} placeholder images in public/img/placeholders/`);
