import { calculateCareerYears } from '../utils/career';

export interface Profile {
  name: string;
  role: string;
  field: string;
  careerYears: number;
  projectCount: number;
  skillCount: number;
  birthYear?: number;
  age?: number;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  introductions: string[];
}

const PROFILE_BIRTH_YEAR = 2005;

export const profile: Profile = {
  name: '김경호',
  role: 'Software Engineer',
  field: 'Fullstack',
  careerYears: calculateCareerYears(),
  projectCount: 7,
  skillCount: 25,
  birthYear: PROFILE_BIRTH_YEAR,
  age: new Date().getFullYear() - PROFILE_BIRTH_YEAR,
  email: 'kimkh05.dev@gmail.com',
  phone: '010-3312-5024',
  introductions: [
    '사용자 경험을 중시하는 프론트엔드 개발자입니다. 웹과 모바일 애플리케이션 개발에 열정을 가지고 있으며, 새로운 기술을 배우고 적용하는 것을 좋아합니다.',
    '팀원들과의 원활한 커뮤니케이션과 코드 리뷰를 통해 함께 성장하는 개발 문화를 지향합니다.',
  ],
};
