// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// PLACEHOLDER: replace with the real domain once registered. Drives canonical
// URLs, sitemap entries and Open Graph tags — see src/data/site.ts.
const SITE_URL = 'https://northgate-academy.netlify.app';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://Gozified.github.io',
  base: '/libertyschoolsintl',
});
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [icon(), sitemap()],
  // The dev toolbar overlays the page and interferes with screenshots/audits.
  devToolbar: { enabled: false },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 5.3 still ships @import-based Sass. Dart Sass warns loudly
          // about that (and about Bootstrap's own internal patterns), which buries
          // real errors. Silence only those known-noisy categories.
          // 'mixed-decls' is deliberately absent — it is obsolete in the
          // installed Sass version and listing it emits its own warning.
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'abs-percent'],
          quietDeps: true,
        },
      },
    },
  },
});
