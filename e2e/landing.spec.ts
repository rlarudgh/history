import { expect, test } from '@playwright/test';

test.describe('랜딩 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/포트폴리오/);
  });

  test('Hero 섹션이 보여야 함', async ({ page }) => {
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    await expect(heroSection.getByRole('heading').first()).toBeVisible();
  });

  test('About 요약 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '안녕하세요!' })).toBeVisible();
  });

  test('프로젝트 미리보기 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '프로젝트' }).first()).toBeVisible();
    const cards = page.locator('article');
    await expect(cards.first()).toBeVisible();
  });

  test('Contact CTA 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /함께 일필요가 있으신가요/ })).toBeVisible();
  });

  test('네비게이션 링크가 동작해야 함', async ({ page }) => {
    await page.getByRole('link', { name: '소개' }).click();
    await expect(page).toHaveURL('/about');
  });
});
