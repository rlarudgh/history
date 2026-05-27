import { expect, test } from '@playwright/test';

test.describe('Contact 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/연락처/);
  });

  test('연락처 정보가 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '연락처', exact: true })).toBeVisible();

    // 이메일
    await expect(page.getByRole('heading', { name: '이메일' })).toBeVisible();
    await expect(page.getByText('email@example.com')).toBeVisible();

    // 전화번호
    await expect(page.getByRole('heading', { name: '전화번호' })).toBeVisible();
    await expect(page.getByText('010-1234-5678')).toBeVisible();

    // GitHub
    await expect(page.getByRole('heading', { name: 'GitHub' })).toBeVisible();

    // LinkedIn
    await expect(page.getByRole('heading', { name: 'LinkedIn' })).toBeVisible();
  });

  test('mailto 링크가 정상적이어야 함', async ({ page }) => {
    const emailLink = page.getByRole('link', { name: /이메일/ });
    await expect(emailLink).toHaveAttribute('href', 'mailto:email@example.com');
  });

  test('tel 링크가 정상적이어야 함', async ({ page }) => {
    const telLink = page.getByRole('link', { name: /전화번호/ });
    await expect(telLink).toHaveAttribute('href', 'tel:+821012345678');
  });
});
