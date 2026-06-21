import { expect, test } from '@playwright/test';

test.describe('다크모드 기능', () => {
  test.beforeEach(async ({ page }) => {
    // localStorage 초기화
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('테마 토글 버튼이 작동해야 함', async ({ page }) => {
    await page.goto('/');

    // 초기 상태: 라이트 모드 (체크박스 unchecked)
    const toggle = page.getByLabel('테마 전환');
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();

    // 다크모드로 전환
    await toggle.click();
    await expect(checkbox).toBeChecked();

    // HTML 요소에 dark 클래스가 추가되어야 함
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    // 라이트모드로 다시 전환
    await toggle.click();
    await expect(checkbox).not.toBeChecked();
    await expect(htmlElement).not.toHaveClass(/dark/);
  });

  test('페이지 전환 후 다크모드 상태가 유지되어야 함', async ({ page }) => {
    await page.goto('/');

    // 다크모드 활성화
    const toggle = page.getByLabel('테마 전환');
    const checkbox = page.getByRole('checkbox');
    await toggle.click();
    await expect(checkbox).toBeChecked();

    // 모바일인 경우 메뉴 열기
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      await page.getByRole('button', { name: '메뉴 열기' }).click();
    }

    // About 페이지로 이동
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');

    // 다크모드 유지 확인
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);

    // 토글 버튼 상태도 유지되어야 함
    const aboutPageCheckbox = page.getByRole('checkbox', { name: '테마 전환' });
    await expect(aboutPageCheckbox).toBeChecked();
  });

  test('페이지 전환 후 라이트모드 상태가 유지되어야 함', async ({ page }) => {
    await page.goto('/');

    // 라이트모드 유지 확인 (초기 상태)
    const checkbox = page.getByRole('checkbox', { name: '테마 전환' });
    await expect(checkbox).not.toBeChecked();

    // 모바일인 경우 메뉴 열기
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    if (isMobile) {
      await page.getByRole('button', { name: '메뉴 열기' }).click();
    }

    // Projects 페이지로 이동
    await page.getByRole('link', { name: 'Project' }).click();
    await expect(page).toHaveURL('/projects');

    // 라이트모드 유지 확인
    const htmlElement = page.locator('html');
    await expect(htmlElement).not.toHaveClass(/dark/);

    // 토글 버튼 상태도 유지되어야 함
    const projectsPageCheckbox = page.getByRole('checkbox', { name: '테마 전환' });
    await expect(projectsPageCheckbox).not.toBeChecked();
  });

  test('다크모드 상태에서 여러 페이지 전환 시 상태 유지', async ({ page }) => {
    const viewport = page.viewportSize();
    const isMobile = viewport && viewport.width < 768;

    test.skip(isMobile, '모바일에서는 복잡한 다중 페이지 전환 테스트가 불안정함');

    await page.goto('/');

    // 다크모드 활성화
    const toggle = page.getByLabel('테마 전환');
    const checkbox = page.getByRole('checkbox');
    await toggle.click();
    await expect(checkbox).toBeChecked();

    const htmlElement = page.locator('html');

    // About 페이지로 이동
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(htmlElement).toHaveClass(/dark/);

    // Projects 페이지로 이동
    await page.getByRole('link', { name: 'Project' }).click();
    await expect(page).toHaveURL('/projects');
    await expect(htmlElement).toHaveClass(/dark/);

    // Contact 페이지로 이동
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
    await expect(htmlElement).toHaveClass(/dark/);

    // 홉으로 돌아오기
    await page.getByRole('link', { name: 'kkh.dev' }).click();
    await expect(page).toHaveURL('/');
    await expect(htmlElement).toHaveClass(/dark/);
  });

  test('localStorage에 테마 설정이 저장되어야 함', async ({ page }) => {
    await page.goto('/');

    // 다크모드 활성화
    const toggle = page.getByLabel('테마 전환');
    const checkbox = page.getByRole('checkbox');
    await toggle.click();

    // localStorage 확인
    const theme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(theme).toBe('dark');

    // 페이지 새로고침
    await page.reload();

    // 다크모드 유지 확인
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveClass(/dark/);
    await expect(checkbox).toBeChecked();

    // 라이트모드로 전환
    await toggle.click();

    // localStorage 확인
    const lightTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(lightTheme).toBe('light');

    // 페이지 새로고침
    await page.reload();

    // 라이트모드 유지 확인
    await expect(htmlElement).not.toHaveClass(/dark/);
    await expect(checkbox).not.toBeChecked();
  });
});
