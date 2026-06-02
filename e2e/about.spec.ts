import { expect, test } from '@playwright/test';

test.describe('About 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/소개/);
  });

  test('소개 제목이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '소개', exact: true })).toBeVisible();
  });

  test('기술 스택 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '기술 스택' })).toBeVisible();
    const badges = page.locator('[class*="badge"], [class*="Badge"]');
    expect(await badges.count()).toBeGreaterThan(0);
  });

  test('경력 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '경력' })).toBeVisible();
    const timelineItems = page.locator('.border-l-2');
    expect(await timelineItems.count()).toBeGreaterThan(0);
  });

  test('학력 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '학력' })).toBeVisible();
    const timelineItems = page.locator('.border-l-2');
    expect(await timelineItems.count()).toBeGreaterThan(0);
  });
});
