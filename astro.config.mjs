import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  site: 'https://moncada25.github.io/fun-phone-privacy-policy/',
  base: '/fun-phone-privacy-policy/',
});
