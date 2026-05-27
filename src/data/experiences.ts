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
    title: '프론트엔드 개발자',
    organization: 'ABC 커머스',
    period: '2023.06 - 2023.12',
    description:
      '쇼핑몰 플랫폼 리뉴얼 프로젝트에서 프론트엔드 개발을 담당했습니다. Next.js 기반의 모던 웹 애플리케이션을 구축하고 SEO 최적화 및 성능 개선을 진행했습니다.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'exp-2',
    type: 'work',
    title: '앱 개발자',
    organization: 'XYZ 핀테크',
    period: '2024.01 - 2024.06',
    description:
      'React Native를 활용한 모바일 뱅킹 앱 개발을 담당했습니다. 생체 인증, 푸시 알림, 실시간 거래 내역 등 핵심 기능을 구현했습니다.',
    tags: ['React Native', 'Firebase', 'Node.js'],
  },
  {
    id: 'exp-3',
    type: 'education',
    title: '컴퓨터공학과',
    organization: '한국대학교',
    period: '2018.03 - 2022.02',
    description: '컴퓨터공학 학사 학위 취득. 웹/앱 개발 동아리 활동 및 다수의 해커톤 참여 경험.',
    tags: ['JavaScript', 'Python', 'Algorithms'],
  },
  {
    id: 'exp-4',
    type: 'education',
    title: '대덕소프트웨어마이스터고등학교',
    organization: '소프트웨어개발과',
    period: '2021.03 - 2024.02',
    description: '',
    tags: ['React', 'Next.js', 'TypeScript', 'cpp', 'java'],
  },
];
