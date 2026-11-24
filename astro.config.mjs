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

  // Astro 7 기본값('jsx')은 인라인 요소 사이 줄바꿈 공백을 제거함 → 기존 렌더링 유지
  compressHTML: true,

  // /projects/index.html 대신 /projects.html 로 출력해 Cloudflare가 /projects → /projects/ 로
  // 리다이렉트하지 않게 함 (내비·링크는 슬래시 없는 경로 기준)
  build: {
    format: 'file',
    // Cloudflare Pages는 출력 디렉토리(dist)를 통째로 공개 배포한다.
    // 정적 파일은 dist/ 바로 아래에 두고, 서버 번들은 dist 밖(dist-server/)에 생성해
    // CSS 경로가 어긋나거나 서버 코드가 공개되지 않게 한다.
    client: './',
    server: '../dist-server/',
  },

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
