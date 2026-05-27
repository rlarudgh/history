# AGENTS.md

## 프로젝트 개요

개인 포트폴리오 사이트입니다. Astro 기반의 정적 사이트로, 개발자의 경력과 프로젝트를 소개하는 용도입니다.

## 기술 스택

- **Framework**: Astro v6 (정적 출력)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Content**: Astro Content Collections + MDX
- **Animation**: AOS (Animate On Scroll)
- **Package Manager**: Bun
- **Code Quality**: Biome
- **Testing**: Playwright (E2E)
- **CI/CD**: GitHub Actions
- **Deploy**: Cloudflare Pages (정적 호스팅)

## 프로젝트 구조

```
src/
  components/
    ui/         # 재사용 가능한 UI 컴포넌트 (Button, Tag, Card 등)
    layout/     # 레이아웃 컴포넌트 (Header, Footer)
    sections/   # 페이지 섹션 컴포넌트 (Hero, AboutSummary 등)
  content/
    projects/   # 프로젝트 MDX 콘텐츠
  data/
    experiences.ts  # 경력/학력 데이터
  layouts/
    Layout.astro    # 공통 레이아웃
  pages/
    index.astro     # 랜딩
    about.astro     # 소개
    projects.astro  # 프로젝트 목록
    projects/
      [slug].astro  # 프로젝트 상세
    contact.astro   # 연락처
  styles/
    global.css      # Tailwind + 전역 스타일
```

## 코딩 컨벤션

- **Formatter**: Biome (2 spaces, single quote, LF)
- **Import 정리**: Biome organizeImports 사용
- **Component**: PascalCase (예: `ProjectCard.astro`)
- **Utility**: camelCase (예: `useTranslations.ts`)
- **스타일링**: Tailwind CSS 유틸리티 클래스 우선

## 개발 워크플로우

### 커밋 메시지

Conventional Commits 규칙을 따릅니다:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

**타입 목록**:
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅 (세미콜론, 공백 등)
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스, 패키지 매니저 등
- `ci`: CI 설정 변경
- `build`: 빌드 시스템 변경
- `revert`: 이전 커밋 되돌리기

**예시**:
```bash
feat(projects): 프로젝트 필터 기능 추가
fix(header): 모바일 메뉴 토글 오류 수정
docs(readme): 설치 방법 업데이트
```

### Git Hooks

- **pre-commit**: Biome check (스테이지된 파일 대상)
- **commit-msg**: Commitlint (커밋 메시지 규칙 검증)

### 스크립트

```bash
# 개발 서버
bun run dev

# 프로덕션 빌드
bun run build

# 코드 린트
bun run lint

# 코드 린트 + 자동 수정
bun run lint:fix

# 코드 포맷팅
bun run format

# E2E 테스트
bun run test:e2e

# E2E 테스트 (UI 모드)
bun run test:e2e:ui
```

## 사용자 설정

- **언어**: 한국어 단일 언어
- **스타일**: 깔끔하고 모던한 디자인 (slate + blue 색상 팔레트)
- **애니메이션**: AOS를 활용한 스크롤 트리거 애니메이션
- **반응형**: 모바일/태블릿/데스크탑 모두 지원

## 배포

- **플랫폼**: Cloudflare Pages
- **방식**: 정적 파일 배포 (`dist/` 폴더)
- **빌드 명령**: `bun run build`
- **출력 디렉토리**: `dist/`
