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
