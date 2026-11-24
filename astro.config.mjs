// @ts-check

import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kkh-log.pages.dev',
  // 기본은 정적(prerender). 블로그 페이지만 `prerender = false`로 SSR(Cloudflare) 처리.
  output: 'static',
  adapter: cloudflare(),

  // About/Contact는 홈 섹션으로 통합됨
  redirects: {
    '/about': '/#about',
    '/contact': '/#contact',
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      tsconfig: {
        configFile: true,
      },
    },
    define: {
      'import.meta.env.GITHUB_USERNAME': JSON.stringify(process.env.GITHUB_USERNAME || 'rlarudgh'),
    },
  },

  integrations: [
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
