# Portfolio Site

> 개인 포트폴리오 웹사이트 - Astro 기반 정적 사이트

[![Astro](https://img.shields.io/badge/Astro-v6-BC52EE?logo=astro)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Biome](https://img.shields.io/badge/Biome-v2-60A5FA?logo=biome)](https://biomejs.dev)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)](https://playwright.dev)

## Overview

개발자의 경력, 프로젝트, 기술 스택을 소개하는 개인 포트폴리오 사이트입니다. 터미널 스타일의 인터랙티브한 Hero 섹션과 깔끔한 프로젝트 카드, 다크모드 지원을 통해 개발자로서의 정체성을 표현합니다.

### Features

- **터미널 스타일 Hero**: 타자 효과가 적용된 CLI 스타일 자기소개
- **프로젝트 포트폴리오**: Content Collections 기반 MDX 프로젝트 관리
- **다크모드 지원**: 시스템 설정 자동 감지 + 수동 토글
- **반응형 디자인**: 모바일/태블릿/데스크탑 모두 지원
- **AOS 애니메이션**: 스크롤 기반 등장 애니메이션
- **View Transitions**: 페이지 전환 애니메이션 (Astro ClientRouter)
- **기술 배지 자동 매핑**: simple-icons 기반 아이콘 자동 연결

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [Astro v6](https://astro.build) (Static Generation) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Content | Astro Content Collections + MDX |
| Animation | AOS (Animate On Scroll) |
| Icons | [simple-icons](https://simpleicons.org) |
| Package Manager | [Bun](https://bun.sh) |
| Linting | [Biome](https://biomejs.dev) |
| Testing | [Playwright](https://playwright.dev) (E2E) |
| CI/CD | GitHub Actions |
| Deploy | [Cloudflare Pages](https://pages.cloudflare.com) |

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Start dev server
bun run dev

# 3. Open http://localhost:4321
```

## Project Structure

```
portfolio-history/
├── public/              # 정적 assets (이미지, 폰트 등)
├── src/
│   ├── components/      # 재사용 컴포넌트
│   │   ├── ui/          # UI 컴포넌트 (Button, Tag, Card 등)
│   │   ├── layout/      # 레이아웃 컴포넌트 (Header, Footer)
│   │   └── sections/    # 페이지 섹션 (Hero, AboutSummary 등)
│   ├── content/         # 콘텐츠 컬렉션 (프로젝트 MDX)
│   ├── data/            # 데이터 파일 (profile, experiences, skills, certifications)
│   ├── layouts/         # 페이지 레이아웃
│   ├── pages/           # 라우팅 페이지
│   └── styles/          # 전역 스타일
├── e2e/                 # E2E 테스트
├── scripts/             # CI 스크립트
├── docs/                # 프로젝트 문서
├── biome.json           # Biome 설정
├── astro.config.mjs     # Astro 설정
└── package.json
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | 개발 서버 실행 |
| `bun run build` | 프로덕션 빌드 |
| `bun run preview` | 빌드 결과 로컬 미리보기 |
| `bun run lint` | 코드 린트 검사 |
| `bun run lint:fix` | 린트 자동 수정 |
| `bun run format` | 코드 포맷팅 |
| `bun run test:e2e` | E2E 테스트 실행 |
| `bun run test:e2e:ui` | E2E 테스트 UI 모드 |

## Documentation

- [프로젝트 구조](./docs/PROJECT_STRUCTURE.md) - 디렉토리 구조와 파일 역할
- [아키텍처](./docs/ARCHITECTURE.md) - 기술 선택과 설계 결정
- [컴포넌트 가이드](./docs/COMPONENTS.md) - 컴포넌트 카탈로그와 사용법
- [개발 워크플로우](./docs/DEVELOPMENT.md) - 개발 환경과 Git 전략
- [배포 가이드](./docs/DEPLOYMENT.md) - CI/CD와 배포 프로세스
- [기술 스택 상세](./docs/SKILLS.md) - 사용 기술 상세 설명

## License

MIT
