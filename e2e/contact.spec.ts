import { expect, test } from '@playwright/test';

test.describe('Contact 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/연락처/);
  });

  test('연락처 정보 링크들이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '연락처', exact: true })).toBeVisible();

    const links = page.locator('a[href^="mailto:"], a[href^="tel:"], a[href^="https://"]');
    expect(await links.count()).toBeGreaterThanOrEqual(4);
  });

  test('이메일 복사 버튼이 정상적이어야 함', async ({ page }) => {
    const emailBtn = page.locator('button[data-copy]').first();
    await expect(emailBtn).toBeVisible();
    const email = await emailBtn.getAttribute('data-copy');
    expect(email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  test('전화번호 복사 버튼이 정상적이어야 함', async ({ page }) => {
    const phoneBtn = page.locator('button[data-copy]').nth(1);
    await expect(phoneBtn).toBeVisible();
    const phone = await phoneBtn.getAttribute('data-copy');
    expect(phone).toMatch(/^\d{3}-\d{4}-\d{4}$/);
  });
});
