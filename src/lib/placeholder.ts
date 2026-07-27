/**
 * Placeholder image helper.
 *
 * Returns src plus intrinsic width/height so every placeholder renders with
 * explicit dimensions. The previous build had zero width/height attributes on
 * any image site-wide, which guaranteed layout shift.
 *
 * Keep RATIOS in sync with scripts/gen-placeholders.mjs.
 */

const RATIOS = {
  hero: [1600, 700],
  wide: [1200, 675],
  card: [900, 600],
  square: [800, 800],
  portrait: [720, 900],
  banner: [1600, 500],
} as const;

type RatioKey = keyof typeof RATIOS;

/** name → ratio, mirroring the generator's manifest. */
const IMAGES = {
  'hero-campus': 'hero',
  'hero-primary': 'hero',
  'hero-secondary': 'hero',
  'page-banner': 'banner',
  'campus-exterior': 'wide',
  'campus-grounds': 'card',
  'primary-classroom': 'card',
  'primary-reading': 'card',
  'primary-art': 'card',
  'primary-playground': 'card',
  'secondary-classroom': 'card',
  'secondary-lab': 'card',
  'secondary-ict': 'card',
  'secondary-seminar': 'card',
  library: 'card',
  'sports-field': 'card',
  'sports-team': 'card',
  'music-room': 'card',
  assembly: 'wide',
  'event-prizegiving': 'card',
  'event-culture-day': 'card',
  'welcome-head': 'portrait',
  'staff-portrait-1': 'portrait',
  'staff-portrait-2': 'portrait',
  'staff-portrait-3': 'portrait',
  'staff-portrait-4': 'portrait',
  'parent-1': 'square',
  'parent-2': 'square',
  'alumnus-1': 'square',
  'news-generic': 'card',
  'og-default': 'wide',
} as const satisfies Record<string, RatioKey>;

export type PlaceholderName = keyof typeof IMAGES;

export function placeholder(name: PlaceholderName) {
  const [width, height] = RATIOS[IMAGES[name]];
  return {
    src: `/img/placeholders/${name}.svg`,
    width,
    height,
  };
}
