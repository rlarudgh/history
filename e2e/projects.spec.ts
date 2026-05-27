import { expect, test } from '@playwright/test';

test.describe('Projects 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('페이지가 정상적으로 로드되어야 함', async ({ page }) => {
    await expect(page).toHaveTitle(/프로젝트/);
  });

  test('필터 버튼들이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('button', { name: '전체' })).toBeVisible();
    await expect(page.getByRole('button', { name: '웹개발' })).toBeVisible();
    await expect(page.getByRole('button', { name: '앱개발' })).toBeVisible();
  });

  test('프로젝트 카드들이 보여야 함', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '모바일 뱅킹 앱 개발' })).toBeVisible();
  });

  test('프로젝트 필터링이 동작해야 함', async ({ page }) => {
    await page.getByRole('button', { name: '웹개발' }).click();
    await expect(page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' })).toBeVisible();
  });

  test('프로젝트 상세 페이지로 이동해야 함', async ({ page }) => {
    await page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' }).click();
    await expect(page).toHaveURL('/projects/e-commerce-renewal');
    await expect(page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' })).toBeVisible();
  });
});

test.describe('Project 상세 페이지', () => {
  test('프로젝트 상세 정보가 표시되어야 함', async ({ page }) => {
    await page.goto('/projects/e-commerce-renewal');

    await expect(page.getByRole('heading', { name: '쇼핑몰 플랫폼 리뉴얼' })).toBeVisible();
    await expect(page.getByText('ABC 커머스')).toBeVisible();
    await expect(page.getByText('프론트엔드 개발')).toBeVisible();
    await expect(page.getByText('기술 스택')).toBeVisible();
    await expect(page.getByText('주요 기능')).toBeVisible();
    await expect(page.getByText('배운 점')).toBeVisible();
  });

  test('모바일 뱅킹 프로젝트 상세 정보가 표시되어야 함', async ({ page }) => {
    await page.goto('/projects/mobile-banking');

    await expect(page.getByRole('heading', { name: '모바일 뱅킹 앱 개발' })).toBeVisible();
    await expect(page.getByText('XYZ 핀테크')).toBeVisible();
  });
});
