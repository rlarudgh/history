export interface Profile {
  name: string;
  role: string;
  field: string;
  careerYears: number;
  projectCount: number;
  skillCount: number;
  avatarUrl?: string;
  introductions: string[];
}

export const profile: Profile = {
  name: '김경호',
  role: 'Software Engineer',
  field: 'Fullstack',
  careerYears: 3,
  projectCount: 7,
  skillCount: 25,
  introductions: [
    '사용자 경험을 중시하는 프론트엔드 개발자입니다. 웹과 모바일 애플리케이션 개발에 열정을 가지고 있으며, 새로운 기술을 배우고 적용하는 것을 좋아합니다.',
    '팀원들과의 원활한 커뮤니케이션과 코드 리뷰를 통해 함께 성장하는 개발 문화를 지향합니다.',
  ],
};
