# SKILLS.md

## 사용 기술 상세 설명

### Framework

#### Astro v6
- 정적 사이트 생성 (SSG)에 최적화된 프레임워크
- Zero JS by default - 필요한 컴포넌트에만 JavaScript 로드
- Content Collections로 타입 안전한 콘텐츠 관리
- MDX 지원으로 마크다운 + JSX 하이브리드 작성

### Language

#### TypeScript
- 정적 타입 검사로 런타임 오류 방지
- Content Collections 스키마 정의에 활용
- 개발 시 자동완성 및 인텔리센스 지원

### Styling

#### Tailwind CSS v4
- 유틸리티 퍼스트 CSS 프레임워크
- JIT (Just-In-Time) 컴파일로 최적화된 번들 크기
- 반응형 디자인을 위한 breakpoint 시스템
- 커스텀 테마 설정 가능

#### @tailwindcss/typography
- prose 클래스를 통한 마크다운 콘텐츠 스타일링
- 기본적인 타이포그래피 스타일 자동 적용

### Content

#### Astro Content Collections
- 파일 기반 콘텐츠 관리
- Zod 스키마를 통한 타입 검증
- 자동 slug 생성 및 정적 경로 생성

#### MDX
- 마크다운 + JSX 컴포넌트 하이브리드
- 프로젝트 상세 페이지의 본문 작성에 사용
- 컴포넌트 임베드 가능

### Animation

#### AOS (Animate On Scroll)
- 스크롤 트리거 기반 애니메이션
- data-aos 속성으로 간단한 적용
- fade, slide, zoom 등 다양한 효과
- once 옵션으로 한 번만 실행
- View Transitions와 함께 사용 시 `astro:page-load` 이벤트에서 재초기화 필요

### Page Transitions

#### Astro View Transitions
- SPA 수준의 부드러운 페이지 전환 애니메이션
- `<ClientRouter />` 컴포넌트로 간단한 적용
- `transition:name`으로 요소 간 연결 (element morphing)
- fallback: `'animate'`로 브라우저 호환성 대응
- `astro:page-load` 이벤트로 전환 후 스크립트 재실행

### Development Tools

#### Bun
- 빠른 패키지 매니저 (npm/yarn 대체)
- 내장 번들러 및 테스트 러너
- package.json 호환

#### Biome
- Rust 기반의 빠른 린터/포맷터
- ESLint + Prettier 대체
- 단일 설정 파일 (biome.json)
- import 정리 기능 내장

#### Husky
- Git hooks 관리
- pre-commit: 코드 품질 검사
- commit-msg: 커밋 메시지 규칙 검증

#### Commitlint
- Conventional Commits 규칙 검증
- 커밋 메시지 구조화
- 변경 이력 자동화 (CHANGELOG 생성 가능)

### Testing

#### Playwright
- E2E (End-to-End) 테스트
- Chromium, Firefox, WebKit 지원
- 모바일 디바이스 에뮬레이션
- 자동 스크린샷 및 비디오 녹화
- HTML 리포트 생성

### CI/CD

#### GitHub Actions
- 코드 푸시 시 자동 빌드/테스트
- PR 시 코드 품질 검사
- Cloudflare Pages 자동 배포

### Deploy

#### Cloudflare Pages
- 정적 사이트 호스팅
- 전 세계 CDN
- 무제한 대역폭 (묶여 티어)
- 자동 HTTPS

### Security Headers

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
