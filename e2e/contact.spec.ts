import { expect, test } from '@playwright/test';

test.describe('홈 섹션: 연락처', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('연락처 섹션과 링크들이 보여야 함', async ({ page }) => {
    const section = page.locator('section#contact');
    await expect(section.getByRole('heading', { name: '연락처', exact: true })).toBeVisible();

    const links = section.locator('a[href^="mailto:"], a[href^="tel:"], a[href^="https://"]');
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

  test('/contact 는 홈 Contact 섹션으로 리다이렉트되어야 함', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL('/#contact');
  });
});
