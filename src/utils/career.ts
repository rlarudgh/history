import { experiences } from '../data/experiences';

/** "2023.07" 형태를 (연*12 + 월) 인덱스로 변환 */
const parseYearMonth = (value: string): number | null => {
  const match = value.match(/(\d{4})\.(\d{1,2})/);
  if (!match) return null;
  return Number(match[1]) * 12 + (Number(match[2]) - 1);
};

/**
 * 회사(work) 경력 기간을 합산해 총 경력(년)을 계산한다.
 * - "2026.06 ~ " 처럼 종료일이 없으면 기준일(now)까지로 본다.
 * - 겹치거나 맞닿은 기간은 병합해 중복 계산을 방지한다.
 */
export const calculateCareerYears = (now: Date = new Date()): number => {
  const nowIndex = now.getFullYear() * 12 + now.getMonth();

  const intervals = experiences
    .filter((exp) => exp.type === 'work')
    .map((exp) => {
      const [startRaw, endRaw] = exp.period.split('~');
      const start = parseYearMonth(startRaw ?? '');
      if (start === null) return null;
      const parsedEnd = endRaw ? parseYearMonth(endRaw) : null;
      return { start, end: parsedEnd ?? nowIndex };
    })
    .filter((v): v is { start: number; end: number } => v !== null)
    .sort((a, b) => a.start - b.start);

  // 겹치는 구간 병합 후 개월 수 합산
  let totalMonths = 0;
  let curStart = -1;
  let curEnd = -1;
  for (const { start, end } of intervals) {
    if (curEnd === -1) {
      curStart = start;
      curEnd = end;
    } else if (start <= curEnd) {
      curEnd = Math.max(curEnd, end);
    } else {
      totalMonths += curEnd - curStart;
      curStart = start;
      curEnd = end;
    }
  }
  if (curEnd !== -1) totalMonths += curEnd - curStart;

  return Math.max(0, Math.round(totalMonths / 12));
};
