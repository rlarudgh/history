import { getCollection } from 'astro:content';
import { profile } from '../data/profile';
import { skills } from '../data/skills';
import { socials } from '../data/socials';
import type { TerminalData } from '../scripts/terminal';

/** 프로필·기술·프로젝트·연락처로 터미널 기본 데이터를 만든다 (빌드 시점 실행) */
export async function getTerminalData(): Promise<TerminalData> {
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

  return {
    name: profile.name,
    role: profile.role,
    field: profile.field,
    careerYears: profile.careerYears,
    tagline: profile.introductions[0],
    skills: skills.map((group) => ({
      category: group.category,
      items: group.items.map((item) => item.name),
    })),
    projects: projects.map((p) => ({
      slug: p.id,
      title: p.data.title,
      category: p.data.category,
      year: p.data.startDate.slice(0, 4),
    })),
    socials: {
      email: socials.email,
      github: socials.github.url,
      linkedin: socials.linkedin.url,
    },
  };
}
