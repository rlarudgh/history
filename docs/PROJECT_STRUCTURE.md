# 프로젝트 구조

## 디렉토리 구조

```
portfolio-history/
├── public/                      # 정적 파일 (빌드 시 복사)
│   └── images/                  # 프로젝트 이미지, 프로필 사진
├── src/
│   ├── components/              # Astro 컴포넌트
│   │   ├── ui/                  # 재사용 가능한 UI 컴포넌트
│   │   │   ├── ProjectCard.astro
│   │   │   ├── TechBadge.astro
│   │   │   ├── Tag.astro
│   │   │   └── ThemeToggle.astro
│   │   ├── layout/              # 레이아웃 관련 컴포넌트
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   └── sections/            # 페이지별 섹션 컴포넌트
│   │       ├── Hero.astro
│   │       ├── AboutSummary.astro
│   │       ├── ProjectPreview.astro
│   │       └── ContactCTA.astro
│   ├── content/                 # Content Collections
│   │   └── projects/            # 프로젝트 MDX 파일
│   │       └── [project-name]/
│   │           └── index.mdx
│   ├── data/                    # 데이터 파일
│   │   ├── profile.ts           # 프로필 정보
│   │   ├── experiences.ts       # 경력/학력
│   │   ├── skills.ts            # 기술 스택
│   │   └── certifications.ts    # 자격증
│   ├── layouts/                 # 페이지 레이아웃
│   │   └── Layout.astro         # 기본 레이아웃 (dark mode, AOS, ClientRouter)
│   ├── pages/                   # 라우팅 페이지
│   │   ├── index.astro          # 홈 (Hero + sections)
│   │   ├── about.astro          # 소개 페이지
│   │   ├── projects.astro       # 프로젝트 목록
│   │   ├── contact.astro        # 연락처
│   │   └── projects/
│   │       └── [slug].astro     # 프로젝트 상세 (동적 라우트)
│   ├── styles/
│   │   └── global.css           # Tailwind + 전역 스타일
│   └── types/
│       └── index.ts             # 전역 타입 정의
├── e2e/                         # Playwright E2E 테스트
│   ├── home.spec.ts
│   ├── navigation.spec.ts
│   ├── projects.spec.ts
│   └── theme.spec.ts
├── scripts/                     # CI/CD 스크립트
│   └── ci/
│       ├── setup.sh
│       ├── lint.sh
│       ├── build.sh
│       └── deploy.sh
├── docs/                        # 프로젝트 문서
│   ├── ARCHITECTURE.md
│   ├── COMPONENTS.md
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   ├── PROJECT_STRUCTURE.md
│   └── SKILLS.md
├── .github/
│   ├── workflows/
│   │   └── ci.yml               # GitHub Actions CI
│   └── CODEOWNERS
├── astro.config.mjs             # Astro 설정
├── biome.json                   # Biome 린터/포맷터 설정
├── commitlint.config.js         # Commitlint 설정
├── playwright.config.ts         # Playwright 설정
├── tailwind.config.ts           # Tailwind CSS 설정
└── package.json
```

## 파일 네이밍 컨벤션

### 컴포넌트
- **PascalCase**: `ProjectCard.astro`, `ThemeToggle.astro`
- 하나의 파일에 하나의 컴포넌트
- 파일명 = 컴포넌트명

### 유틸리티/데이터
- **camelCase**: `profile.ts`, `experiences.ts`
- 복수형으로 데이터 배열 표현: `skills.ts`, `certifications.ts`

### 페이지
- **kebab-case**: `about.astro`, `contact.astro`
- 동적 라우트: `[slug].astro`

### 스타일
- **kebab-case**: `global.css`

## 디렉토리별 역할 상세

### `src/components/ui/`
재사용 가능한 순수 UI 컴포넌트. 비즈니스 로직 없이 props 기반으로 동작합니다.

| 컴포넌트 | 역할 |
|---------|------|
| `ProjectCard.astro` | 프로젝트 목록에 표시되는 카드 |
| `TechBadge.astro` | 기술 스택 배지 (simple-icons 연동) |
| `Tag.astro` | 카테고리/해시태그 태그 |
| `ThemeToggle.astro` | 다크모드 ON/OFF 스위치 |

### `src/components/layout/`
페이지 레이아웃의 일부로 사용되는 컴포넌트.

| 컴포넌트 | 역할 |
|---------|------|
| `Header.astro` | 상단 네비게이션 바 |
| `Footer.astro` | 하단 푸터 |

### `src/components/sections/`
페이지를 구성하는 섹션 단위 컴포넌트. 각 섹션은 독립적으로 배치 가능합니다.

| 컴포넌트 | 역할 |
|---------|------|
| `Hero.astro` | 터미널 + 프로필 카드 메인 섹션 |
| `AboutSummary.astro` | 홈페이지 소개 요약 |
| `ProjectPreview.astro` | 홈페이지 프로젝트 미리보기 |
| `ContactCTA.astro` | 연락처 CTA 섹션 |

### `src/content/projects/`
Content Collections로 관리되는 프로젝트 콘텐츠.

```
projects/
├── ai-reviewer/
│   └── index.mdx
├── chitacare/
│   └── index.mdx
├── cym702-for-human/
│   └── index.mdx
├── cym702-for-pets/
│   └── index.mdx
├── yellosis-backoffice-web/
│   └── index.mdx
├── yellosis-homepage/
│   └── index.mdx
└── yellosis-wellness/
    └── index.mdx
```

각 프로젝트는 독립 폴더에 `index.mdx` 파일을 가집니다. `coverImage`가 있으면 해당 폴더에 이미지도 함께 배치합니다.

### `src/data/`
타입 정의와 함께 정적인 데이터를 관리합니다.

| 파일 | 내용 |
|------|------|
| `profile.ts` | 이름, 역할, 소개글, 통계 |
| `experiences.ts` | 경력(Work) 및 학력(Education) |
| `skills.ts` | 기술 스택 카테고리별 분류 |
| `certifications.ts` | 자격증 목록 |

### `src/pages/`
Astro의 파일 기반 라우팅으로, 각 파일이 하나의 페이지가 됩니다.

| 파일 | 경로 | 설명 |
|------|------|------|
| `index.astro` | `/` | 홈페이지 |
| `about.astro` | `/about` | 소개 페이지 |
| `projects.astro` | `/projects` | 프로젝트 목록 |
| `projects/[slug].astro` | `/projects/:slug` | 프로젝트 상세 |
| `contact.astro` | `/contact` | 연락처 페이지 |

## 컨텐츠 스키마

### 프로젝트 (`src/content/config.ts`)

```typescript
{
  title: string;           // 프로젝트 제목
  shortDesc: string;       // 짧은 설명
  company: string;         // 소속 회사
  role: string;            // 담당 역할
  category: string;        // 카테고리 (웹/앱/AI/서버)
  techStack: string[];     // 사용 기술
  hashtags: string[];      // 해시태그
  startDate: string;       // 시작일
  endDate?: string;        // 종료일 (optional)
  coverImage?: string;     // 커버 이미지 경로 (optional)
}
```

## 정적 에셋

### `public/images/`
- 프로젝트 커버 이미지: `project-[name].webp`
- 프로필 이미지: `profile.webp` (optional)
- WebP 포맷 사용 권장

### 이미지 최적화
- `srcset` 미사용 (정적 사이트)
- `loading="lazy"` 적용
- `object-cover`로 비율 유지
