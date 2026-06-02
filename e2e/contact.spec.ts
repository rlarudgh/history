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

  test('mailto 링크가 정상적이어야 함', async ({ page }) => {
    const emailLink = page.locator('a[href^="mailto:"]').first();
    await expect(emailLink).toBeVisible();
    const href = await emailLink.getAttribute('href');
    expect(href).toMatch(/^mailto:/);
  });

  test('tel 링크가 정상적이어야 함', async ({ page }) => {
    const telLink = page.locator('a[href^="tel:"]').first();
    await expect(telLink).toBeVisible();
    const href = await telLink.getAttribute('href');
    expect(href).toMatch(/^tel:\+82/);
  });
});
