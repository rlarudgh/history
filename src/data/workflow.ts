/** "How I build" 섹션 문구. 수치·코드 예시는 Workflow.astro가 빌드 시 저장소 파일에서 직접 읽는다. */

export const REPO_URL = 'https://github.com/rlarudgh/history';

export interface WorkflowStep {
  key: 'plan' | 'rules' | 'guardrails' | 'verify' | 'review';
  label: string;
  title: string;
  description: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    key: 'plan',
    label: 'Plan',
    title: '코드보다 계획 먼저',
    description:
      '요구사항이 모호하면 먼저 질문으로 범위를 좁히고, 변경 파일과 검증 방법이 담긴 계획을 승인한 뒤에만 구현을 맡깁니다.',
  },
  {
    key: 'rules',
    label: 'Rules',
    title: '컨벤션은 문서로 주입',
    description:
      'AGENTS.md와 주제별 규칙 파일로 스택·스타일·접근성·보안 기준을 정해 두어, 어떤 세션에서도 같은 기준으로 코드가 나오게 합니다.',
  },
  {
    key: 'guardrails',
    label: 'Guardrails',
    title: '사람이 아니라 장치가 막는다',
    description:
      '에이전트가 .env 같은 민감 파일을 수정하려 하면 Claude Code 훅이 차단하고, 커밋 전 Biome 검사와 커밋 메시지 규칙 검사를 git 훅으로 강제해 실수가 저장소에 들어오기 전에 걸러냅니다.',
  },
  {
    key: 'verify',
    label: 'Verify',
    title: '통과해야 끝난 것',
    description:
      '사용자 동작 단위의 E2E 테스트를 데스크탑·모바일에서 돌리고, CI에서 lint → build → e2e를 다시 확인합니다.',
  },
  {
    key: 'review',
    label: 'Review',
    title: '마지막 판단은 직접',
    description:
      '결과를 브라우저에서 직접 보고, 기준에 못 미치면 다시 돌려보냅니다. AI가 낸 첫 결과를 그대로 쓰지 않는 것이 가장 중요한 단계입니다.',
  },
];

export interface CaseEvent {
  tag: string;
  text: string;
}

/** 사례: 이 사이트의 디자인 개편 과정 */
export const caseStudy = {
  title: '이 사이트의 디자인 개편',
  summary:
    '"AI가 만든 것 같다"는 결과물을 두 번 돌려보내고, 하루 안에 구조부터 다시 만든 기록입니다.',
  events: [
    {
      tag: '판단',
      text: '그라데이션·글로우·별 파티클 등 템플릿 느낌이 강하다고 판단해 재작업을 요청',
    },
    {
      tag: '1차',
      text: '장식 제거, 포인트 컬러 1색으로 정리 → 틀이 그대로라 여전히 부족하다고 판단',
    },
    {
      tag: '재설계',
      text: '터미널만 남기고 좌측 고정 사이드바 + 단일 홈 구조로 계획을 다시 세운 뒤 승인',
    },
    { tag: '검증', text: '새 구조에 맞춰 E2E를 다시 작성하고 데스크탑·모바일에서 전부 통과 확인' },
    {
      tag: '장애',
      text: 'CI 러너가 Ubuntu 26.04로 바뀌며 Playwright 설치 실패 → 러너 고정, 훅 버그도 함께 수정',
    },
    { tag: '디테일', text: '흑백 썸네일 hover 효과가 오히려 불편하다고 판단해 제거' },
  ] satisfies CaseEvent[],
};
