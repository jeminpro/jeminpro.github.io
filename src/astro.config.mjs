import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// site: 'http://localhost:4321',
	site: 'https://jeminpro.com',
	integrations: [mdx(), sitemap()],
});
