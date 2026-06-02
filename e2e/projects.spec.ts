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
    const filterBtns = page.locator('.filter-btn');
    await expect(filterBtns).toHaveCount(await filterBtns.count());
    expect(await filterBtns.count()).toBeGreaterThan(1);
  });

  test('프로젝트 카드들이 보여야 함', async ({ page }) => {
    const cards = page.locator('article');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('프로젝트 필터링이 동작해야 함', async ({ page }) => {
    const firstFilter = page.locator('.filter-btn').nth(1);
    await firstFilter.click();
    await expect(firstFilter).toHaveClass(/bg-blue-600/);
  });

  test('프로젝트 상세 페이지로 이동해야 함', async ({ page }) => {
    const firstCard = page.locator('article').first();
    await firstCard.click();
    await expect(page).toHaveURL(/\/projects\//);
    await expect(page.getByRole('heading').first()).toBeVisible();
  });
});

test.describe('Project 상세 페이지', () => {
  test('프로젝트 상세 정보가 표시되어야 함', async ({ page }) => {
    await page.goto('/projects/chitacare');

    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByText('기술 스택')).toBeVisible();
    await expect(page.getByText('주요 기능')).toBeVisible();
    await expect(page.getByText('배운 점')).toBeVisible();
  });
});
