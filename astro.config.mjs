import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://moncada25.github.io/fun-phone-web/',
  base: '/fun-phone-web/',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
