export interface NavLink {
  href: string;
  label: string;
  /** 홈 페이지 내 섹션 id (스크롤 스파이 대상) */
  section?: string;
}

export const navLinks: NavLink[] = [
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/#experience', label: 'Experience', section: 'experience' },
  { href: '/#skills', label: 'Skills', section: 'skills' },
  { href: '/projects', label: 'Projects', section: 'projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
];

/** 현재 경로 기준으로 활성화할 내비 항목인지 판단 (홈 섹션은 스크롤 스파이가 담당) */
export function isActivePath(link: NavLink, pathname: string): boolean {
  if (link.href.startsWith('/#')) return false;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}
