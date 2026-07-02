// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Staging (github.io project page) serves under /mann-ptsa-site/, so the
// deploy workflow sets ASTRO_SITE/ASTRO_BASE. Once mannptsa.org is attached,
// remove those env vars from the workflow and the defaults below take over.
export default defineConfig({
  site: process.env.ASTRO_SITE ?? 'https://mannptsa.org',
  base: process.env.ASTRO_BASE ?? '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
