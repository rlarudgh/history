# 개발 워크플로우

## 개발 환경 설정

### 사전 요구사항

- **Node.js**: >= 22.12.0
- **Bun**: 최신 버전

### Bun 설치

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows (WSL 권장)
curl -fsSL https://bun.sh/install | bash
```

### 프로젝트 설정

```bash
# 1. 저장소 클론
git clone <repository-url>
cd portfolio-history

# 2. 의존성 설치
bun install

# 3. 개발 서버 실행
bun run dev

# 4. 브라우저에서 확인
open http://localhost:4321
```

---

## 개발 프로세스

### 1. 기능 개발

```bash
# 새 브랜치 생성
git checkout -b feature/새로운기능

# 개발
bun run dev

# 코드 품질 확인
bun run lint

# E2E 테스트
bun run test:e2e

# 커밋
git add .
git commit -m "feat(hero): 터미널 애니메이션 추가"

# 푸시 및 PR 생성
git push origin feature/새로운기능
```

### 2. 버그 수정

```bash
git checkout -b fix/버그설명

# 수정
git add .
git commit -m "fix(header): 모바일 메뉴 토글 오류 수정"
```

### 3. 리팩토링

```bash
git checkout -b refactor/리팩토링설명

git add .
git commit -m "refactor(components): ProjectCard 타입 분리"
```

---

## 커밋 컨벤션

### Conventional Commits

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### 타입 목록

| 타입 | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 | `feat(hero): 터미널 애니메이션 추가` |
| `fix` | 버그 수정 | `fix(header): 모바일 메뉴 오류 수정` |
| `docs` | 문서 변경 | `docs(readme): 설치 방법 업데이트` |
| `style` | 코드 포맷팅 | `style(hero): 들여쓰기 수정` |
| `refactor` | 코드 리팩토링 | `refactor(data): 경력 데이터 분리` |
| `perf` | 성능 개선 | `perf(images): 이미지 최적화` |
| `test` | 테스트 추가/수정 | `test(e2e): 프로젝트 페이지 테스트 추가` |
| `chore` | 빌드/패키지 | `chore(deps): astro 업데이트` |
| `ci` | CI 설정 변경 | `ci(github): 배포 스크립트 수정` |
| `build` | 빌드 시스템 변경 | `build(astro): output 설정 변경` |
| `revert` | 이전 커밋 되돌리기 | `revert: 이전 커밋 되돌리기` |

### Scope 규칙

- 컴포넌트명: `hero`, `header`, `project-card`
- 페이지명: `home`, `about`, `projects`
- 영역: `components`, `data`, `styles`, `ci`

### Subject 규칙

- 명령문/현재형 사용 ("추가" not "추가했음")
- 첫 글자 소문자
- 마침표 없음
- 50자 이내

### 예시

```bash
feat(hero): 우주 배경 효과 추가

- 80개 반짝이는 별
- 6개 별똥별 애니메이션
- 떠다니는 입자 효과

fix(ui): 다크모드 토글 스위치로 변경

- 라디오 버튼에서 스위치 UI로 변경
- 접근성 개선 (aria-label)

docs(readme): 프로젝트 구조 문서 추가
```

---

## 코드 스타일

### Biome 설정

**파일**: `biome.json`

| 설정 | 값 | 설명 |
|------|-----|------|
| `indentStyle` | `space` | 스페이스 2칸 |
| `indentWidth` | `2` | 들여쓰기 2 |
| `lineEnding` | `lf` | LF (Unix 스타일) |
| `lineWidth` | `100` | 최대 줄 길이 100 |
| `quoteStyle` | `single` | 작은따옴표 |
| `trailingCommas` | `es5` | ES5 trailing comma |
| `semicolons` | `always` | 항상 세미콜론 |

### 린트 규칙

```json
{
  "correctness": {
    "noUnusedVariables": "error",
    "noUnusedImports": "error"
  },
  "suspicious": {
    "noConsole": "warn"
  },
  "style": {
    "useConst": "error",
    "useTemplate": "error"
  }
}
```

### Astro 파일 예외

Astro 파일은 unused 변수/임포트 검사를 비활성화 (프론트매터 특성상 false positive 발생)

```json
{
  "overrides": [
    {
      "includes": ["**/*.astro"],
      "linter": {
        "rules": {
          "correctness": {
            "noUnusedVariables": "off",
            "noUnusedImports": "off"
          }
        }
      }
    }
  ]
}
```

---

## Git Hooks

### pre-commit

```bash
# .husky/pre-commit
biome check --staged
```

- 스테이지된 파일 대상 린트/포맷 검사
- 실패 시 커밋 차단

### commit-msg

```bash
# .husky/commit-msg
commitlint --edit $1
```

- 커밋 메시지 Conventional Commits 규칙 검증
- 실패 시 커밋 차단

---

## 테스트

### E2E 테스트 (Playwright)

**파일**: `e2e/`

| 테스트 파일 | 내용 |
|------------|------|
| `home.spec.ts` | 홈페이지 로딩, Hero 섹션, 프로젝트 카드 |
| `navigation.spec.ts` | 네비게이션, 페이지 이동 |
| `projects.spec.ts` | 프로젝트 목록, 필터, 상세 페이지 |
| `theme.spec.ts` | 다크모드 토글, localStorage |

### 테스트 실행

```bash
# 헤드리스 모드
bun run test:e2e

# UI 모드 (디버깅용)
bun run test:e2e:ui

# 특정 파일만
npx playwright test e2e/home.spec.ts

# 특정 브라우저
npx playwright test --project=chromium
```

### 테스트 작성 규칙

```typescript
import { test, expect } from '@playwright/test';

test('describe what the test does', async ({ page }) => {
  await page.goto('/');
  
  // Arrange
  const element = page.locator('[data-testid="element"]');
  
  // Act
  await element.click();
  
  // Assert
  await expect(page).toHaveURL('/target');
  await expect(element).toBeVisible();
});
```

---

## 브랜치 전략

```
main (배포 브랜치)
  ↑
develop (개발 브랜치)
  ↑
feature/* (기능 브랜치)
  ↑
fix/* (버그 수정 브랜치)
  ↑
refactor/* (리팩토링 브랜치)
```

### 브랜치 네이밍

```
feature/hero-animation
feature/project-filter
fix/header-mobile-menu
fix/darkmode-toggle
refactor/component-types
docs/api-reference
```

### PR 규칙

- [ ] 1개 이상의 approval
- [ ] CI 통과 (lint + build + test)
- [ ] 충돌 없음
- [ ] 관련 이슈 연결
- [ ] Self-review 완료

---

## 데이터 수정 가이드

### 프로필 수정

**파일**: `src/data/profile.ts`

```typescript
export const profile: Profile = {
  name: '김경호',
  role: '프론트엔드 개발자',
  field: 'Fullstack',
  careerYears: 3,
  projectCount: 7,
  skillCount: 25,
  introductions: [
    '소개글 1',
    '소개글 2',
  ],
};
```

### 경력/학력 수정

**파일**: `src/data/experiences.ts`

```typescript
{
  id: 'exp-1',
  type: 'work',        // 'work' | 'education'
  title: '프론트엔드 개발자',
  organization: 'ABC Corp',
  period: '2023.06 - 2023.12',
  description: '담당 업무 설명',
  tags: ['React', 'TypeScript'],
}
```

### 기술 스택 수정

**파일**: `src/data/skills.ts`

```typescript
{
  category: 'Web & WebView',
  items: ['React', 'Next.js', 'Vue2', 'Astro'],
}
```

### 프로젝트 추가

1. `src/content/projects/` 아래 새 폴더 생성
2. `index.mdx` 파일 작성

```mdx
---
title: '새 프로젝트'
shortDesc: '프로젝트 설명'
company: '회사명'
role: '역할'
category: '웹'
techStack: ['React', 'TypeScript']
hashtags: ['web', 'frontend']
startDate: '2024.01'
endDate: '2024.06'
coverImage: '/images/project-new.webp'
---

프로젝트 상세 내용...
```

### 이미지 추가

```bash
# public/images/에 이미지 복사
cp project-image.webp public/images/project-name.webp
```

WebP 포맷 권장, 커버 이미지는 16:9 비율 권장

---

## 디버깅 가이드

### 개발 서버 문제

```bash
# 캐시 삭제 후 재시작
rm -rf .astro
rm -rf node_modules/.astro
bun run dev

# 포트 충돌 시
bun run dev -- --port 4322
```

### 빌드 실패

```bash
# 타입 체크
npx astro check

# 상세 에러 로그
bun run build --verbose
```

### 스타일 문제

```bash
# Tailwind CSS 캐시 삭제
rm -rf node_modules/.cache
bun run dev
```

### 테스트 실패

```bash
# Playwright 브라우저 설치
npx playwright install

# UI 모드로 디버깅
bun run test:e2e:ui
```

---

## 성능 프로파일링

### Lighthouse

```bash
# 빌드 후 프리뷰
bun run build
bun run preview

# Chrome DevTools -> Lighthouse 탭
```

### 번들 분석

```bash
# Astro 빌드 분석
bun run build
ls -la dist/

# JavaScript 크기 확인
find dist -name "*.js" -exec ls -lh {} \;
```
