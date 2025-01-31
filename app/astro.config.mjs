import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import expressiveCode from "astro-expressive-code";

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // site: 'http://localhost:4321',
  site: 'https://jeminpro.com',
  integrations: [expressiveCode({
    themes: ['dark-plus'],
  }), mdx(), sitemap(), icon()]
});