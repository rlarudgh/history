import { expect, test } from '@playwright/test';

test.describe('홈 섹션: 경력 · 기술', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('경력 섹션에 항목이 있어야 함', async ({ page }) => {
    const section = page.locator('section#experience');
    await expect(section.getByRole('heading', { name: '경력' })).toBeVisible();
    expect(await section.locator('.exp-toggle').count()).toBeGreaterThan(0);
  });

  test('경력 항목 클릭 시 아코디언이 펼쳐져야 함', async ({ page }) => {
    const btn = page.getByRole('button', { name: /럽맘/ });
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  test('학력이 표시되어야 함', async ({ page }) => {
    const section = page.locator('section#experience');
    await expect(section.getByRole('heading', { name: '학력' })).toBeVisible();
  });

  test('기술 스택 분야가 표시되어야 함', async ({ page }) => {
    const section = page.locator('section#skills');
    await expect(section.getByRole('heading', { name: '기술 스택' })).toBeVisible();
    expect(await section.locator('.skill-group').count()).toBeGreaterThan(0);
    await expect(section.getByText('Server', { exact: true })).toBeVisible();
  });

  test('/about 은 홈 About 섹션으로 리다이렉트되어야 함', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL('/#about');
  });
});
