import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  // site: 'http://localhost:4321',
  site: 'https://jeminpro.com',
  integrations: [
  expressiveCode({
    themes: ['dark-plus', 'github-light'],
    themeCssSelector: (theme) => `[data-theme="${theme.type}"]`,
    useDarkModeMediaQuery: false,
    // Inline code-block CSS. The deployed /_astro/ec.*.css file 404s, so the
    // copy button falls back to normal flow under the code block.
    emitExternalStylesheet: false,
    plugins: [pluginLineNumbers()],
    defaultProps: {
      showLineNumbers: false    }
  }), 
  mdx(), sitemap(), icon()]
});

