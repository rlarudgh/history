# PRD.md - Product Requirements Document

## 1. 프로젝트 개요

개인 포트폴리오 웹사이트로, 개발자의 경력, 프로젝트, 연락처 정보를 소개하는 정적 사이트입니다.

## 2. 목표

- 개인 브랜딩 및 경력 증명
- 프로젝트 아카이빙 및 포트폴리오 제시
- 잠재적 고용주/클리언트와의 연결

## 3. 타겟 사용자

- 채용 담당자
- 프로젝트 클라이언트
- 동료 개발자

## 4. 기능 요구사항

### 4.1 페이지 구조

| 페이지 | 설명 |
|--------|------|
| 랜딩 (/) | Hero, About 요약, 프로젝트 미리보기, 연락처 CTA |
| 소개 (/about) | 자기소개, 기술 스택, 경력/학력 타임라인 |
| 프로젝트 목록 (/projects) | 전체 프로젝트 카드 목록, 해시태그 필터 |
| 프로젝트 상세 (/projects/[slug]) | MDX 기반 상세 페이지 |
| 연락처 (/contact) | 이메일, 전화번호, GitHub, LinkedIn |

### 4.2 공통 기능

- **반응형 디자인**: 모바일/태블릿/데스크탑 대응
- **스크롤 애니메이션**: AOS 라이브러리 활용
- **SEO 최적화**: 메타 태그, Open Graph, Canonical URL
- **네비게이션**: 고정 헤더 + 모바일 메뉴

### 4.3 프로젝트 기능

- **Content Collections**: MDX 파일 기반 콘텐츠 관리
- **해시태그 필터링**: 웹개발/앱개발 등 카테고리 필터
- **상세 페이지**: 메타데이터 + 마크다운 본문 렌더링

## 5. 비기능 요구사항

### 5.1 성능

- Lighthouse Performance 90+ 점수
- 정적 HTML 출력 (Zero JS by default)
- 이미지 최적화 (lazy loading)

### 5.2 접근성

- 시맨틱 HTML 구조
- 적절한 ARIA 레이블
- 키보드 네비게이션 지원

### 5.3 개발 환경

- **코드 품질**: Biome (lint + format)
- **커밋 규칙**: Conventional Commits + commitlint
- **테스트**: Playwright E2E (크로스 브라우저)
- **CI/CD**: GitHub Actions (lint → build → test → deploy)

## 6. 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Astro v6 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Content | Astro Content Collections + MDX |
| Animation | AOS |
| Package Manager | Bun |
| Lint/Format | Biome |
| Testing | Playwright |
| CI/CD | GitHub Actions |
| Deploy | Cloudflare Pages |

## 7. 데이터 모델

### 7.1 프로젝트 (MDX Frontmatter)

```yaml
title: string
company: string
role: string
techStack: string[]
shortDesc: string
features: string[]
hashtags: string[]
learnings: string[]
links: { label: string, url: string }[]
coverImage: string
startDate: string
endDate?: string
isOngoing: boolean
order: number
screenshots?: string[]
```

### 7.2 경력 (TypeScript)

```typescript
interface Experience {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  period: string;
  description?: string;
  tags?: string[];
}
```

## 8. 배포

- **플랫폼**: Cloudflare Pages
- **방식**: 정적 파일 배포
- **빌드 명령**: `bun run build`
- **출력 디렉토리**: `dist/`
