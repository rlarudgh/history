# Testing Guidelines

## 1. 테스트 전략

이 프로젝트는 **E2E 테스트(Playwright)**를 주로 사용한다. 정적 사이트 특성상 단위 테스트보다는 페이지 단위의 통합 테스트가 더 효과적이다.

```bash
# E2E 테스트 실행
bun run test:e2e

# E2E 테스트 (UI 모드)
bun run test:e2e:ui

# 특정 파일만 실행
bunx playwright test e2e/landing.spec.ts
```

## 2. 테스트 파일 명명 규칙

테스트 파일은 `e2e/` 디렉토리에 배치하고, `*.spec.ts` 확장자를 사용한다.

```
e2e/
├── landing.spec.ts      # 랜딩 페이지 테스트
├── about.spec.ts        # About 페이지 테스트
├── projects.spec.ts     # 프로젝트 목록/상세 테스트
└── contact.spec.ts      # 연락처 페이지 테스트
```

## 3. 테스트 코드 스타일

```typescript
// ✅ Correct: AAA 패턴 (Arrange, Act, Assert)
import { test, expect } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    // Arrange & Act (beforeEach에서 처리)
    // Assert
    await expect(page).toHaveTitle(/포트폴리오/);
  });

  test('Hero 섹션이 보여야 함', async ({ page }) => {
    // Arrange
    // Act
    // Assert
    await expect(page.getByRole('heading', { name: '홍길동' })).toBeVisible();
  });
});

// ❌ Incorrect: 불필요한 테스트
test('테스트', async ({ page }) => {
  await page.goto('/');
  expect(true).toBe(true);
});
```

## 4. 테스트 대상 기준

다음 사항은 반드시 테스트해야 한다.

```typescript
// ✅ 테스트 필수:

// 1. 페이지 로드 및 타이틀
 test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
   await page.goto('/about');
   await expect(page).toHaveTitle(/소개/);
 });

// 2. 주요 콘텐츠 표시
 test('프로젝트 카드들이 보여야 함', async ({ page }) => {
   await page.goto('/projects');
   await expect(page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' })).toBeVisible();
 });

// 3. 사용자 인터랙션 (필터, 네비게이션)
 test('프로젝트 필터링이 동작해야 함', async ({ page }) => {
   await page.goto('/projects');
   await page.getByRole('button', { name: '웹개발' }).click();
   await expect(page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' })).toBeVisible();
 });

// 4. 페이지 간 이동
 test('프로젝트 상세 페이지로 이동해야 함', async ({ page }) => {
   await page.goto('/projects');
   await page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' }).click();
   await expect(page).toHaveURL('/projects/e-commerce-renewal');
 });

// ❌ 테스트 불필요:
// - 단순한 정적 텍스트 표시 (빌드 타임에 검증됨)
// - CSS 스타일링 세부사항
// - 마크다운 렌더링 결과
```

## 5. 반응형 테스트

모바일/데스크탑 모두 테스트한다.

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});

// 테스트에서 viewport 직접 지정
test('모바일 메뉴가 동작해야 함', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');

  // 모바일 메뉴 버튼 클릭
  await page.getByRole('button', { name: '메뉴 열기' }).click();
  await expect(page.getByRole('link', { name: '소개' })).toBeVisible();
});
```

## 6. 접근성 테스트

스크린 리더 친화적인 요소들을 테스트한다.

```typescript
// ✅ Correct: 접근성 속성 검증
test('네비게이션 링크에 적절한 접근성 속성이 있어야 함', async ({ page }) => {
  await page.goto('/');

  const menuBtn = page.getByRole('button', { name: '메뉴 열기' });
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

  await menuBtn.click();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
});

// 이미지 alt 텍스트 검증
test('프로젝트 이미지에 alt 속성이 있어야 함', async ({ page }) => {
  await page.goto('/projects');
  const images = page.locator('img');
  const count = await images.count();

  for (let i = 0; i < count; i++) {
    const alt = await images.nth(i).getAttribute('alt');
    expect(alt).not.toBeNull();
  }
});
```

## 7. 스크린샷 비교 (선택사항)

시각적 회귀 테스트가 필요한 경우:

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
});

// 테스트에서 사용
test('랜딩 페이지 스크린샷', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('landing.png');
});
```

## 8. 테스트 데이터

더미 데이터를 사용하여 테스트 일관성을 유지한다.

```typescript
// e2e/fixtures.ts
export const testProjects = [
  {
    title: '쇼핑몰 플랫폼 리뉴얼',
    slug: 'e-commerce-renewal',
    company: 'ABC 커머스',
  },
  {
    title: '모바일 뱅킹 앱 개발',
    slug: 'mobile-banking',
    company: 'XYZ 핀테크',
  },
];

// 테스트에서 사용
test('모든 프로젝트가 표시되어야 함', async ({ page }) => {
  await page.goto('/projects');

  for (const project of testProjects) {
    await expect(page.getByRole('heading', { name: project.title })).toBeVisible();
  }
});
```
