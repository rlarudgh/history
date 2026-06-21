import { expect, test } from '@playwright/test';

test.describe('About 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/소개/);
  });

  test('프로필 이름이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible();
  });

  test('기술 스택 섹션이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '기술 스택' })).toBeVisible();
    // 분야 탭이 표시되는지 확인
    const tabs = page.getByRole('tab');
    expect(await tabs.count()).toBeGreaterThan(0);
    // range bar가 표시되는지 확인
    const bars = page.locator('.skill-bar');
    expect(await bars.count()).toBeGreaterThan(0);
  });

  test('기술 스택 분야 탭 클릭 시 해당 분야가 보여야 함', async ({ page }) => {
    await page.getByRole('tab', { name: /Server/ }).click();
    await expect(page.getByRole('tabpanel', { name: /Server/ })).toBeVisible();
  });

  test('경력 섹션이 보여야 함', async ({ page }) => {
    const heading = page.getByRole('heading', { name: '경력' });
    await expect(heading).toBeVisible();
    const section = page.locator('section').filter({ has: heading });
    expect(await section.locator('.pl-8').count()).toBeGreaterThan(0);
  });

  test('경력 항목 클릭 시 아코디언이 펼쳐져야 함', async ({ page }) => {
    const btn = page.getByRole('button', { name: /럽맘/ });
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  test('학력 섹션이 보여야 함', async ({ page }) => {
    const heading = page.getByRole('heading', { name: '학력' });
    await expect(heading).toBeVisible();
    const section = page.locator('section').filter({ has: heading });
    expect(await section.locator('.pl-8').count()).toBeGreaterThan(0);
  });
});
