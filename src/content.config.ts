/**
 * Content collections — typed content editable by staff through Decap CMS
 * (Phase 6) without touching code.
 *
 * Schemas enforce what the previous build only hoped for: alt text is
 * required, dates are real Date objects (not "24" / "Jul" string fragments
 * split across markup), and categories are closed enums the UI can safely
 * derive filter buttons from instead of hand-mirroring a fixed list.
 * A missing or malformed field fails `npm run build` — it can't ship silently.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** A photo with mandatory alt text — never render one without it. */
const image = z.object({
  src: z.string(),
  alt: z.string().min(1, 'Alt text is required — describe what the photo shows.'),
});

const section = z.enum(['whole-school', 'primary', 'secondary']).default('whole-school');

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Academics', 'Sports', 'Arts', 'Community', 'Announcements']),
    section,
    excerpt: z.string().max(220),
    cover: image,
    draft: z.boolean().default(false),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    allDay: z.boolean().default(true),
    location: z.string().default('Main Campus'),
    section,
    excerpt: z.string().max(220).optional(),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['Campus', 'Primary', 'Secondary', 'Sports', 'Arts', 'Events']),
    image,
    featured: z.boolean().default(false),
  }),
});

export const collections = { news, events, gallery };
