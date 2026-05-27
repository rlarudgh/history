# 배포 가이드

## 배포 아키텍처

```
GitHub Repository
       │
       │ push / PR merge
       ▼
GitHub Actions (CI)
       │
       ├─ 1. 코드 체크아웃
       ├─ 2. 의존성 설치 (bun install)
       ├─ 3. 린트 검사 (biome check)
       ├─ 4. 타입 체크 (astro check)
       ├─ 5. E2E 테스트 (playwright)
       └─ 6. 빌드 (astro build)
              │
              ▼
       Cloudflare Pages
       ├─ 정적 파일 호스팅
       ├─ 전 세계 CDN
       ├─ 자동 HTTPS
       └─ 커스텀 도메인
```

---

## 배포 설정

### Cloudflare Pages

**설정 방법**:

1. [Cloudflare Dashboard](https://dash.cloudflare.com) 접속
2. Pages -> "Create a project"
3. GitHub 저장소 연결
4. 빌드 설정:

| 설정 | 값 |
|------|-----|
| Framework | Astro |
| Build command | `bun run build` |
| Build output directory | `dist` |
| Root directory | `/` |

5. 환경 변수 (필요시):

| 변수 | 설명 |
|------|------|
| `NODE_VERSION` | `22.12.0` |

### GitHub Actions

**파일**: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run test:e2e

  build:
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
```

### CI 스크립트

**파일**: `scripts/ci/`

| 스크립트 | 내용 |
|----------|------|
| `setup.sh` | Bun 설치, 의존성 설치 |
| `lint.sh` | Biome 린트 검사 |
| `build.sh` | Astro 빌드 |
| `deploy.sh` | Cloudflare Pages 배포 |

---

## 배포 워크플로우

### 프로덕션 배포 (main 브랜치)

```bash
# 1. develop 브랜치에서 main으로 PR 생성
gh pr create --base main --head develop --title "Release v1.2.0"

# 2. PR 머지 (GitHub 웹에서)
# CI 통과 후 머지

# 3. 자동 배포
# main 브랜치 푸시 -> GitHub Actions -> Cloudflare Pages
```

### 핫픽스 배포

```bash
# 1. main 브랜치에서 핫픽스 브랜치 생성
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug

# 2. 수정 및 커밋
# ... 수정 ...
git add .
git commit -m "fix(header): critical bug fix"

# 3. main으로 직접 PR 및 머지
git push origin hotfix/critical-bug

# 4. develop에도 백머지
git checkout develop
git merge main
git push origin develop
```

---

## 환경별 설정

### 개발 환경 (Local)

```bash
bun run dev
# http://localhost:4321
```

### 스테이징 환경 (Preview)

```bash
bun run build
bun run preview
# http://localhost:4321 (빌드된 결과)
```

### 프로덕션 환경

```
https://your-domain.pages.dev
```

### 환경 변수

Astro는 빌드 시점에 환경 변수를 사용합니다.

```bash
# .env 파일 (로컬)
PUBLIC_SITE_URL=https://localhost:4321

# .env.production (프로덕션)
PUBLIC_SITE_URL=https://your-domain.pages.dev
```

**사용**:
```astro
---
const siteUrl = import.meta.env.PUBLIC_SITE_URL;
---
<meta property="og:url" content={siteUrl} />
```

---

## 도메인 설정

### 커스텀 도메인 연결

1. Cloudflare Pages -> 프로제트 -> Custom domains
2. "Set up a custom domain"
3. 도메인 입력 (예: `example.com`)
4. DNS 레코드 확인 및 설정

### DNS 설정

| 타입 | 이름 | 내용 |
|------|------|------|
| CNAME | `@` | `your-project.pages.dev` |
| CNAME | `www` | `your-project.pages.dev` |

---

## 배포 검증

### 배포 후 확인 사항

- [ ] 사이트 접속 가능
- [ ] HTTPS 적용 확인
- [ ] 다크모드 정상 작동
- [ ] 페이지 전환 애니메이션 작동
- [ ] 프로젝트 상세 페이지 정상 표시
- [ ] 이미지 로딩 확인
- [ ] 모바일 반응형 확인
- [ ] Lighthouse 점수 확인

### 헬스 체크

```bash
# 사이트 상태 확인
curl -I https://your-domain.pages.dev

# 응답 확인
# HTTP/2 200
# cf-ray: xxx
# cf-cache-status: HIT
```

---

## 롤백

### Cloudflare Pages 롤백

1. Cloudflare Dashboard -> Pages
2. 프로젝트 선택 -> Deployments
3. 이전 배포 선택 -> "Rollback to this deployment"

### Git 롤백

```bash
# 이전 커밋으로 되돌리기
git revert <commit-hash>
git push origin main
```

---

## 모니터링

### Cloudflare Analytics

- 요청 수, 대역폭 사용량
- 방문자 지역, 브라우저 정보
- 캐시 적중률

### Lighthouse CI (선택)

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://your-domain.pages.dev/
      https://your-domain.pages.dev/projects
    budgetPath: ./lighthouse-budget.json
```

---

## 성능 예산

| 지표 | 예산 | 경고 |
|------|------|------|
| First Contentful Paint | < 1.8s | < 3s |
| Largest Contentful Paint | < 2.5s | < 4s |
| Time to Interactive | < 3.8s | < 7.3s |
| Total Blocking Time | < 200ms | < 600ms |
| Cumulative Layout Shift | < 0.1 | < 0.25 |
| Speed Index | < 3.4s | < 5.8s |

---

## 문제 해결

### 빌드 실패

```bash
# 로컬에서 재현
bun run build

# 에러 메시지 확인
# TypeScript 타입 오류 -> 타입 수정
# Import 오류 -> 경로 확인
# MDX 문법 오류 -> frontmatter 확인
```

### 배포 실패

```bash
# 빌드 로그 확인 (GitHub Actions)
# Cloudflare Pages 로그 확인

# 일반적인 원인
# - 의존성 누락 -> bun install 확인
# - 메모리 부족 -> 빌드 스크립트 최적화
# - 파일 크기 초과 -> 이미지 최적화
```

### 404 오류

```bash
# Astro output 설정 확인
# astro.config.mjs -> output: 'static'

# 동적 라우트 확인
# src/pages/projects/[slug].astro
# getStaticPaths() 함수 확인
```

### 캐시 문제

```bash
# Cloudflare 캐시 제거
# Dashboard -> Caching -> Configuration -> Purge Everything

# 브라우저 캐시 제거
# Ctrl + Shift + R (강력 새로고침)
```
