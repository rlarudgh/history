# 컴포넌트 가이드

## 컴포넌트 분류

| 분류 | 위치 | 설명 |
|------|------|------|
| UI | `src/components/ui/` | 재사용 가능한 순수 UI |
| Layout | `src/components/layout/` | 페이지 레이아웃 요소 |
| Section | `src/components/sections/` | 페이지별 섹션 단위 |

---

## UI 컴포넌트

### ProjectCard

프로젝트 목록에 표시되는 카드 컴포넌트.

**파일**: `src/components/ui/ProjectCard.astro`

**Props**:

```typescript
interface Props {
  title: string;        // 프로젝트 제목
  shortDesc: string;    // 짧은 설명
  company: string;      // 회사명
  role: string;         // 역할
  category: string;     // 카테고리 (웹/앱/AI/서버)
  techStack: string[];  // 기술 스택 배열
  hashtags: string[];   // 해시태그
  coverImage?: string;  // 커버 이미지 경로 (optional)
  slug: string;         // 프로젝트 슬러그
}
```

**사용 예시**:

```astro
---
import ProjectCard from '../components/ui/ProjectCard.astro';
---

<ProjectCard
  title="AI Reviewer"
  shortDesc="AI 기반 코드 리뷰 시스템"
  company="ABC Corp"
  role="Frontend Developer"
  category="AI"
  techStack={['React', 'TypeScript', 'OpenAI']}
  hashtags={['ai', 'code-review']}
  coverImage="/images/project-ai.webp"
  slug="ai-reviewer"
/>
```

**특징**:
- 커버 이미지가 없으면 카테고리 기반 그라데이트 배경 표시
- View Transitions `transition:name` 지원
- 기술 스택은 최대 4개 표시, 초과 시 `+N` 표시

---

### TechBadge

기술 스택을 표시하는 배지 컴포넌트. simple-icons 자동 연동.

**파일**: `src/components/ui/TechBadge.astro`

**Props**:

```typescript
interface Props {
  name: string;  // 기술명 (예: "React", "Next.js")
}
```

**사용 예시**:

```astro
<TechBadge name="React" />
<TechBadge name="Next.js" />
<TechBadge name="Tailwind CSS" />
```

**동작**:
1. `name`을 simple-icons slug로 변환: `React` -> `siReact`
2. `simple-icons`에서 아이콘 임포트
3. 아이콘이 있으면 SVG + 이름 표시
4. 없으면 `?` + 이름 표시

**slug 변환 규칙**:
```typescript
'si' + name.toLowerCase().replace(/[^a-z0-9]/g, '')
// React -> siReact
// Next.js -> sinextjs
// Tailwind CSS -> sitailwindcss
```

---

### Tag

카테고리나 해시태그를 표시하는 태그 컴포넌트.

**파일**: `src/components/ui/Tag.astro`

**Props**:

```typescript
interface Props {
  label: string;            // 태그 텍스트
  variant?: 'primary' | 'outline';  // 스타일 변형
}
```

**사용 예시**:

```astro
<Tag label="Frontend" variant="primary" />
<Tag label="#react" variant="outline" />
```

**Variant**:
- `primary`: 채워진 배경 (blue-600)
- `outline`: 테두리만 (slate-300)

---

### ThemeToggle

다크모드 ON/OFF 스위치 컴포넌트.

**파일**: `src/components/ui/ThemeToggle.astro`

**Props**: 없음

**사용 예시**:

```astro
<ThemeToggle />
```

**동작**:
- 체크박스 기반 스위치 UI
- 클릭 시 `document.documentElement.classList.toggle('dark')`
- `localStorage.setItem('theme', 'light' | 'dark')`

**스타일**:
- 트랙: `bg-slate-200 dark:bg-slate-700`
- 슬라이더: 흰색 원, 다크모드 시 우측 이동 (`translate-x-6`)
- 내부 아이콘: 좌측 해(라이트), 우측 달(다크)

---

## Layout 컴포넌트

### Header

상단 네비게이션 바.

**파일**: `src/components/layout/Header.astro`

**Props**: 없음

**기능**:
- 로고 (사이트명)
- 네비게이션 링크 (홈, 소개, 프로젝트, 연락처)
- 다크모드 토글 (`ThemeToggle`)
- 모바일: 햄버거 메뉴

**스크롤 동작**:
- 스크롤 시 배경 블러 효과 (`backdrop-blur-md`)

---

### Footer

하단 푸터.

**파일**: `src/components/layout/Footer.astro`

**Props**: 없음

**내용**:
- 저작권 표시
- 소셜 링크 (GitHub, LinkedIn, Email)
- 기술 스택 배지

---

## Section 컴포넌트

### Hero

메인 Hero 섹션. 터미널 + 프로필 카드 듀얼 레이아웃.

**파일**: `src/components/sections/Hero.astro`

**Props**:

```typescript
interface Props {
  name?: string;      // 기본값: profile.name
  role?: string;      // 기본값: profile.role
  tagline?: string;   // 기본값: profile.introductions[0]
  skills?: string[];  // 기본값: ['React', 'TypeScript', ...]
}
```

**구조**:
```
Hero Section (min-h-screen)
├── 배경 (다크: 우주/별똥별, 라이트: 파스텔 하늘)
├── 왼쪽: Terminal Card
│   ├── macOS 3버튼 헤더
│   └── 터미널 본문 (타이핑 효과)
└── 오른쪽: Profile Card
    ├── 아바타 (그라데이트)
    ├── 이름/역할
    ├── 통계 (경력/프로젝트/기술스택)
    └── 퀵링크 버튼
```

**터미널 타이핑 시퀀스**:
```
➜ ~ whoami
    김경호
➜ ~ cat role.txt
    개발자
➜ ~ cat about.txt
    사용자 경험을 중시하는 웹 개발자입니다.
➜ ~ ls skills/
    React  TypeScript  Next.js  Node.js  TailwindCSS
➜ ~ _
```

**배경 효과** (다크모드):
- 80개 반짝이는 별 (twinkle 애니메이션)
- 6개 별똥별 (shooting-star 애니메이션)
- 20개 떠다니는 입자 (float 애니메이션)
- 미세 그리드 패턴

---

### AboutSummary

소개 페이지 요약 섹션 (홈페이지용).

**파일**: `src/components/sections/AboutSummary.astro`

**Props**: 없음

**내용**:
- 프로필 소개글
- 기술 스택 미리보기
- "더 알아보기" 링크 -> /about

---

### ProjectPreview

홈페이지 프로젝트 미리보기 섹션.

**파일**: `src/components/sections/ProjectPreview.astro`

**Props**: 없음

**동작**:
- 최신 3개 프로젝트 표시
- `ProjectCard` 사용
- "모든 프로젝트 보기" 링크 -> /projects

---

### ContactCTA

연락처 CTA 섹션.

**파일**: `src/components/sections/ContactCTA.astro`

**Props**: 없음

**내용**:
- 연락 유도 문구
- 이메일/소셜 링크
- "연락하기" 버튼 -> /contact

---

## Layout (레이아웃)

### Layout

기본 페이지 레이아웃. 모든 페이지가 상속받습니다.

**파일**: `src/layouts/Layout.astro`

**Props**:

```typescript
interface Props {
  title: string;           // 페이지 제목
  description?: string;    // 메타 설명
}
```

**사용 예시**:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="홈 | 포트폴리오" description="개발자 포트폴리오">
  <Hero />
  <AboutSummary />
</Layout>
```

**기능**:
- HTML 기본 구조 (`<html>`, `<head>`, `<body>`)
- 메타 태그 (charset, viewport, description, og)
- 파비콘
- Tailwind CSS (`global.css` 임포트)
- 다크모드 초기화 스크립트 (inline, render-blocking)
- AOS 초기화
- `<ClientRouter />` (View Transitions)
- Header + Footer 레이아웃

**다크모드 초기화 스크립트**:
```html
<script is:inline>
  const theme = localStorage.getItem('theme');
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

**중요**: `is:inline` 필수 (Astro가 스크립트를 번들링하지 않도록)

---

## 컴포넌트 설계 원칙

### 1. 단일 책임 원칙
- 하나의 컴포넌트는 하나의 역할만
- 복잡한 컴포넌트는 섹션 단위로 분리

### 2. Props 기반 구성
- 하드코딩된 데이터 금지
- `data/` 폴더의 데이터 파일 활용
- 타입 인터페이스 명시

### 3. 스타일링
- Tailwind 유틸리티 클래스 우선
- 커스텀 CSS는 최소화
- 다크모드: `dark:` 프리픽스

### 4. 접근성
- 적절한 시맨틱 태그 (`<article>`, `<section>`, `<nav>`)
- `aria-label` 필수
- 색상 대비 WCAG 기준 준수

### 5. 성능
- 이미지: `loading="lazy"`
- 클라이언트 JS: 최소화 (Astro Zero JS 기본값)
- 애니메이션: `transform` 및 `opacity` 사용 (GPU 가속)
