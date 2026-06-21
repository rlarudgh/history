export type ExperienceType = 'work' | 'education' | 'school';

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  period: string;
  description?: string;
  /** 상세 업무 내역 (아코디언으로 펼쳐짐) */
  details?: string[];
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
    details: [
      '사람용 소변검사 기반 AI 건강관리 솔루션 Cym702: For Human 앱 개발',
      '반려동물용 소변검사 기반 AI 건강관리 솔루션 Cym702: For Pet 앱 개발',
      '옐로시스 홈페이지 개발',
      '데이터 관리를 위한 back-office 웹사이트 개발',
      '헬스케어 치타케어 앱 개발',
      '파트너 회사 제공을 위한 웹앱 개발',
      '옐로시스 웰니스 서비스 개발 (진행 중)',
    ],
    tags: ['Next.js', 'TypeScript', 'zustand', 'Vue2', 'React', 'Flutter', 'Kotlin'],
  },
  {
    id: 'exp-2',
    type: 'education',
    title: '서울사이버대학교',
    organization: '컴퓨터공학과',
    period: '2024.03 ~ 2027.07(예상)',
    description: '',
    tags: ['CS', 'Python', 'Java', 'Linux', 'etc.'],
  },
  {
    id: 'exp-3',
    type: 'education',
    title: '대덕소프트웨어마이스터고등학교',
    organization: '소프트웨어개발과',
    period: '2021.03 ~ 2024.02',
    description: '소프트웨어개발과 졸업. 웹 개발 동아리장 운영 및 다수의 해커톤 참여 경험.',
    tags: ['React', 'Next.js', 'TypeScript', 'cpp', 'Java', 'Python'],
  },
  {
    id: 'exp-4',
    type: 'work',
    title: '럽맘 주식회사',
    organization: 'Web Full Stack 개발자',
    period: '2026.06 ~',
    description: '(프리랜서 근무)',
    details: [
      'Remix 기반 풀스택 웹 애플리케이션 설계 및 개발',
      'Nest.js·Prisma를 활용한 백엔드 API 구축',
      'raw SQL 작성 및 쿼리 성능 최적화',
      'React·Zustand 기반 프론트엔드 구현',
    ],
    tags: ['Remix', 'TypeScript', 'zustand', 'React', 'Nest.js', 'Prisma', 'raw-sql'],
  },
];
