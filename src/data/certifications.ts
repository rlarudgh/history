export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: '정보처리기능사',
    issuer: '한국산업인력공단',
    date: '2023.12',
    description: '(현재 프로그래밍기능사로 변경)',
  },
];
