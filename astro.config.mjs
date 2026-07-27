// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// SITE_URL drives canonical URLs, sitemap entries and Open Graph tags
const SITE_URL = 'https://libertyschools.netlify.app';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [icon(), sitemap()],
  devToolbar: { enabled: false },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'abs-percent'],
          quietDeps: true,
        },
      },
    },
  },
});
