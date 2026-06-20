/**
 * 테마 관리 유틸리티
 */

/**
 * 초기 테마를 결정합니다.
 * 1. localStorage에 저장된 테마 우선
 * 2. 없으면 시스템 테마 사용
 * 3. 기본값은 light
 */
export function getInitialTheme(): 'dark' | 'light' {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme') as 'dark' | 'light';
  }
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

/**
 * 테마를 적용합니다.
 * @param theme 적용할 테마 ('dark' | 'light')
 */
export function applyTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * 현재 적용된 테마를 반환합니다.
 */
export function getCurrentTheme(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * 방문자 카운터를 초기화합니다.
 * 세션당 1회만 카운트를 증가시킵니다.
 */
export function initVisitorCounter(): number {
  if (typeof localStorage === 'undefined' || typeof sessionStorage === 'undefined') {
    return 0;
  }

  const STORAGE_KEY = 'visitor-count';
  const SESSION_KEY = 'visitor-session';

  // 현재 카운트 가져오기
  const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

  // 세션당 1회만 카운트 증가
  if (!sessionStorage.getItem(SESSION_KEY)) {
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    sessionStorage.setItem(SESSION_KEY, 'true');
    return newCount;
  }

  return currentCount;
}

/**
 * 현재 방문자 카운트를 반환합니다.
 */
export function getVisitorCount(): number {
  if (typeof localStorage === 'undefined') {
    return 0;
  }

  return parseInt(localStorage.getItem('visitor-count') || '0', 10);
}
