// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';

export default defineConfig({
  site: 'https://coffeegearpicks.com',
  output: 'static',
  build: {
    format: 'preserve',
  },
  trailingSlash: 'never',
  integrations: [preact()],
});
