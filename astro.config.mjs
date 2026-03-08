// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://coffeegearpicks.com',
  output: 'static',
  build: {
    format: 'preserve',
  },
  trailingSlash: 'never',
});
