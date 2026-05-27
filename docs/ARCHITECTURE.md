# 아키텍처 설계

## 기술 선택 이유

### Astro v6 (Static Generation)

**선택 이유**:
- **Zero JS by default**: 콘텐츠 중심 포트폴리오에 최적화
- **정적 출력**: Cloudflare Pages 등 CDN 배포에 최적
- **Content Collections**: 타입 안전한 파일 기반 콘텐츠 관리
- **MDX 지원**: 마크다운 + JSX 하이브리드로 유연한 콘텐츠 작성
- **View Transitions**: SPA 수준의 페이지 전환 애니메이션 내장

**대안 검토**:
- Next.js: SSR 불필요, 오버엔지니어링
- Gatsby: 빌드 속도, 복잡도
- 11ty: 타입 안전성 부족

### Tailwind CSS v4

**선택 이유**:
- **유틸리티 퍼스트**: 빠른 UI 개발
- **JIT 컴파일**: 최적화된 CSS 번들
- **다크모드**: `dark:` 프리픽스로 간단한 모드 전환
- **v4 업그레이드**: Vite 플러그인 방식, 더 빠른 빌드

### TypeScript

**선택 이유**:
- Content Collections 스키마 타입 검증
- 컴포넌트 props 타입 안전성
- IDE 자동완성 및 인텔리센스

### Bun

**선택 이유**:
- npm/yarn 대비 3-5배 빠른 설치 속도
- 호환성: `package.json` 표준 포맷
- 내장 번들러 및 테스트 러너 (향후 확장 가능)

## 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                       클라이언트                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   홈     │  │  소개    │  │ 프로젝트 │  │ 연락처   │   │
│  │  index   │  │  about   │  │ projects │  │ contact  │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │             │             │           │
│       └─────────────┴──────┬──────┴─────────────┘           │
│                            │                                │
│              ┌─────────────┴─────────────┐                  │
│              │      Layout.astro         │                  │
│              │  - 다크모드 스크립트       │                  │
│              │  - AOS 초기화             │                  │
│              │  - ClientRouter           │                  │
│              │  - Header + Footer        │                  │
│              └─────────────┬─────────────┘                  │
│                            │                                │
│  ┌─────────────────────────┼─────────────────────────────┐ │
│  │         섹션 컴포넌트      │                             │ │
│  │  ┌──────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐    │ │
│  │  │ Hero │ │  About   │ │ Project  │ │ Contact  │    │ │
│  │  │      │ │ Summary  │ │ Preview  │ │   CTA    │    │ │
│  │  └──────┘ └──────────┘ └──────────┘ └──────────┘    │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      데이터 레이어                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Content    │  │    Data      │  │    MDX       │     │
│  │ Collections  │  │   Files      │  │   Render     │     │
│  │  (Projects)  │  │ (Profile,    │  │  (Content)   │     │
│  │              │  │ Experiences) │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     빌드/배포 파이프라인                     │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│  │  Biome   │ -> │  Astro   │ -> │  Cloud-  │            │
│  │  Lint    │    │  Build   │    │  flare   │            │
│  │  Check   │    │  (SSG)   │    │  Pages   │            │
│  └──────────┘    └──────────┘    └──────────┘            │
└─────────────────────────────────────────────────────────────┘
```

## 주요 설계 결정

### 1. Content Collections for Projects

**결정**: 프로젝트 데이터를 MDX 파일로 관리

**이유**:
- 마크다운으로 본문 작성, frontmatter로 메타데이터 관리
- 타입 스키마(`zod`)로 데이터 검증
- Git 버전 관리 용이
- 비개발자도 쉽게 수정 가능

**트레이드오프**:
- ✅ 타입 안전성, 버전 관리, 협업 용이
- ❌ CMS 대비 UI 편집 불가 (정적 파일 편집 필요)

### 2. View Transitions

**결정**: Astro의 `<ClientRouter />` 사용

**이유**:
- SPA 수준의 부드러운 페이지 전환
- 별도 라이브러리 불필요 (Astro 내장)
- `transition:name`으로 요소 연결 (project-image)

**구현**:
```astro
<!-- Layout.astro -->
<ClientRouter />

<!-- 프로젝트 카드 -->
<div transition:name={`project-image-${slug}`}>

<!-- 프로젝트 상세 -->
<div transition:name={`project-image-${project.id}`}>
```

**AOS 재초기화**:
```javascript
document.addEventListener('astro:page-load', () => {
  AOS.init({ ... });
});
```

### 3. 다크모드 구현

**결정**: `localStorage` + `class` 기반 (Tailwind `dark:`)

**구현 흐름**:
```
[시스템 설정 감지]
    │
    ├─ (첫 방문) -> localStorage 'theme' 없음
    │   └─ prefers-color-scheme 확인
    │       ├─ dark -> <html class="dark">
    │       └─ light -> <html class="">
    │
    └─ (재방문) -> localStorage 'theme' 읽기
        ├─ 'dark' -> <html class="dark">
        └─ 'light' -> <html class="">
```

**중요**: Layout.astro에 인라인 `<script>`로 초기화
- 페이지 로딩 전 `flash of unstyled content` 방지
- View Transitions 후에도 상태 유지

### 4. Tech Badge 자동 매핑

**결정**: `simple-icons`의 `si*` 네이밍 규칙 활용

**매핑 로직**:
```typescript
function toSlug(tech: string): string {
  return 'si' + tech.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// React -> siReact
// Next.js -> sinextjs
// Tailwind CSS -> sitailwindcss
```

**fallback**: 아이콘이 없을 경우 `?` 표시

### 5. 스타일 아키텍처

**결정**: Tailwind 유틸리티 클래스 우선, CSS 최소화

**파일 구조**:
```
styles/
└── global.css          # Tailwind directives + custom animations
```

**커스텀 애니메이션** (global.css 또는 컴포넌트 내 `<style>`):
- 터미널 타이핑 효과
- 별똥별 애니메이션
- 반짝이는 별 (twinkle)
- 떠다니는 입자 (float)

### 6. 상태 관리

**결정**: 외부 상태 관리 라이브러리 미사용

**이유**:
- 콘텐츠 중심 사이트로 복잡한 상태 없음
- 다크모드: localStorage + DOM class
- 터미널: 컴포넌트 내부 JavaScript (IIFE)

### 7. 이미지 처리

**결정**: 정적 이미지 (public/)

**이유**:
- Astro Image Service는 SSG에서 외부 호스팅 권장
- Cloudflare Pages는 이미지 최적화 내장
- WebP 포맷 사용으로 충분한 최적화

**커버 이미지 없을 때**: CSS 그라데이트 + 카테고리 아이콘으로 대체

## 성능 고려사항

### 번들 크기 최적화
- Astro의 자동 코드 분할
- 컴포넌트별 JavaScript (islands architecture)
- Tailwind JIT로 미사용 CSS 제거

### 로딩 최적화
- `loading="lazy"` on images
- 폰트: system font stack 사용 (별도 폰트 로딩 없음)
- preconnect to Cloudflare CDN

### Core Web Vitals 목표
| 지표 | 목표 |
|------|------|
| LCP | < 2.5s |
| FID/INP | < 100ms |
| CLS | < 0.1 |

## 보안

### 정적 사이트 보안
- XSS: 사용자 입력 없음 (정적 콘텐츠만)
- CSP: Cloudflare Pages 기본 헤더
- HTTPS: Cloudflare 자동 적용

### 보안 헤더 (Cloudflare Pages)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 확장성

### 향후 추가 가능한 기능
- **i18n**: Astro i18n 라우팅 (다국어 지원)
- **블로그**: Content Collections에 posts 추가
- **CMS 연동**: Sanity/Strapi 등 headless CMS
- **댓글**: Giscus (GitHub Discussions)
- **조회수**: Cloudflare Workers + KV

### 마이그레이션 시나리오
- **SSR 필요 시**: Astro output을 `server`로 변경
- **동적 데이터**: API Routes (`src/pages/api/`) 추가
- **React/Vue 추가**: Astro의 프레임워크 통합 사용
