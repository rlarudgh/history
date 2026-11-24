import { expect, test } from '@playwright/test';
import { isMobileViewport, openNavIfMobile } from './helpers';

test.describe('홈 (단일 페이지)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/포트폴리오/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('zsh 터미널이 타이핑을 시작해야 함', async ({ page }) => {
    await expect(page.getByText('~/kkh.dev — zsh')).toBeVisible();
    await expect(page.locator('#terminal-output')).toContainText('whoami');
  });

  test('모든 홈 섹션이 존재해야 함', async ({ page }) => {
    for (const id of ['about', 'experience', 'skills', 'projects', 'contact']) {
      await expect(page.locator(`section#${id}`)).toBeAttached();
    }
    await expect(page.getByRole('heading', { name: '안녕하세요!' })).toBeVisible();
  });

  test('대표 프로젝트가 표시되고 전체 목록으로 이동해야 함', async ({ page }) => {
    const rows = page.locator('#projects article');
    expect(await rows.count()).toBeGreaterThan(0);

    await page.getByRole('link', { name: /전체 프로젝트/ }).click();
    await expect(page).toHaveURL('/projects');
  });

  test('내비게이션 About 클릭 시 해당 섹션으로 이동해야 함', async ({ page }) => {
    await openNavIfMobile(page);
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/#about');
    await expect(page.getByRole('heading', { name: '안녕하세요!' })).toBeInViewport();
  });

  test('데스크탑에서 사이드바가 스크롤 후에도 고정되어야 함', async ({ page }) => {
    test.skip(isMobileViewport(page), '사이드바는 데스크탑 전용');

    const sidebar = page.getByRole('complementary', { name: '사이드바' });
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(sidebar).toBeInViewport();
    await expect(sidebar.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  test('모바일 메뉴 버튼이 aria-expanded를 토글해야 함', async ({ page }) => {
    test.skip(!isMobileViewport(page), '모바일 전용');

    const btn = page.getByRole('button', { name: '메뉴 열기' });
    await expect(btn).toHaveAttribute('aria-expanded', 'false');
    await btn.click();
    await expect(btn).toHaveAttribute('aria-expanded', 'true');
  });
});
