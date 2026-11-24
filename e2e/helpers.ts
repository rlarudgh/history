import type { Page } from '@playwright/test';

/** 사이드바가 보이는 데스크탑 기준 폭 (Tailwind lg) */
export const DESKTOP_MIN_WIDTH = 1024;

export function isMobileViewport(page: Page): boolean {
  const viewport = page.viewportSize();
  return !!viewport && viewport.width < DESKTOP_MIN_WIDTH;
}

/** 모바일이면 헤더 메뉴를 열어 내비 링크를 노출한다 */
export async function openNavIfMobile(page: Page): Promise<void> {
  if (isMobileViewport(page)) {
    await page.getByRole('button', { name: '메뉴 열기' }).click();
  }
}
