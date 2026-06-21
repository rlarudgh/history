export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Web & WebView',
    items: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 90 },
      { name: 'Vue2', level: 85 },
      { name: 'Remix', level: 80 },
      { name: 'Astro', level: 70 },
    ],
  },
  {
    category: 'App(Native)',
    items: [
      { name: 'Flutter', level: 85 },
      { name: 'Kotlin', level: 80 },
      { name: 'React-Native', level: 75 },
    ],
  },
  {
    category: 'Server',
    items: [
      { name: 'Nest.js', level: 80 },
      { name: 'Spring boot', level: 75 },
      { name: 'Fast API', level: 75 },
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'sqlite', level: 75 },
      { name: 'golang', level: 50 },
    ],
  },
  {
    category: 'Etc',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Figma', level: 70 },
      { name: 'Jira', level: 75 },
      { name: 'Claude Code', level: 90 },
      { name: 'Codex', level: 80 },
    ],
  },
];
