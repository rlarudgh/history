export type ExperienceType = 'work' | 'education' | 'school';

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description?: string;
  tags?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    type: 'work',
    title: '옐로시스 주식회사',
    organization: '프론트엔드 개발자',
    period: '2023.07 ~ 2026.06',
    description: 'AI기반 소변검사 앱(WebView, Native) 유지보수 및 개발',
    tags: ['Next.js', 'TypeScript', 'zustand', 'Vue2', 'React', 'Flutter', 'Kotlin'],
  },
  {
    id: 'exp-2',
    type: 'education',
    title: '서울사이버대학교',
    organization: '컴퓨터공학과',
    period: '2024.03 ~ 2027.07(예상)',
    description: '컴퓨터공학 학사 학위 취득. 웹/앱 개발 동아리 활동 및 다수의 해커톤 참여 경험.',
    tags: ['CS', 'Python', 'Java', 'Linux', 'etc.'],
  },
  {
    id: 'exp-3',
    type: 'education',
    title: '대덕소프트웨어마이스터고등학교',
    organization: '소프트웨어개발과',
    period: '2021.03 ~ 2024.02',
    description: '',
    tags: ['React', 'Next.js', 'TypeScript', 'cpp', 'Java', 'Python'],
  },
  {
    id: 'exp-4',
    type: 'work',
    title: '럽맘 주식회사',
    organization: 'Web Full Stack 개발자',
    period: '2026.06 ~',
    description: '(프리랜서 근무)',
    tags: ['Remix', 'TypeScript', 'zustand', 'React', 'Nest.js', 'Prisma', 'raw-sql'],
  },
];
