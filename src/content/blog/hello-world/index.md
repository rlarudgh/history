---
title: Astro로 포트폴리오 사이트 만들기
description: Astro와 Tailwind CSS를 활용해 정적 포트폴리오 사이트를 구축한 경험을 공유합니다.
pubDate: 2026-06-04
tags:
  - astro
  - tailwindcss
  - portfolio
category: Frontend
---

Astro는 정적 사이트 생성에 최적화된 프레임워크입니다. 이 글에서는 Astro를 선택한 이유와 구축 과정에서의 팁을 정리합니다.

## Astro를 선택한 이유

- **Zero JS by default**: 기본적으로 JavaScript를 클라이언트로 전송하지 않아 로딩 속도가 빠릅니다.
- **Islands Architecture**: 필요한 컴포넌트만 하이드레이션하여 최적의 성능을 얻을 수 있습니다.
- **Markdown/MDX 지원**: 콘텐츠 중심 사이트에 매우 편리합니다.

## Tailwind CSS와의 조합

Tailwind CSS v4는 Vite 플러그인 형태로 제공되어 Astro와의 통합이 매끄럽습니다. JIT 컴파일과 다크 모드 지원으로 개발 생산성이 크게 향상됩니다.

## 마무리

Astro + Tailwind 조합은 개발자 포트폴리오나 기술 블로그에 강력한 선택지입니다.
