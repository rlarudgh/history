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
      { name: 'React', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Vue2', level: 70 },
      { name: 'Astro', level: 75 },
    ],
  },
  {
    category: 'App(Native)',
    items: [
      { name: 'Kotlin', level: 80 },
      { name: 'Flutter', level: 75 },
      { name: 'React-Native', level: 70 },
    ],
  },
  {
    category: 'Server',
    items: [
      { name: 'Nest.js', level: 80 },
      { name: 'Spring boot', level: 70 },
      { name: 'Fast API', level: 75 },
      { name: 'MySQL', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'sqlite', level: 65 },
      { name: 'golang', level: 70 },
    ],
  },
  {
    category: 'Etc',
    items: [
      { name: 'Git', level: 85 },
      { name: 'Figma', level: 70 },
      { name: 'Jira', level: 75 },
      { name: 'Claude Code', level: 80 },
      { name: 'Codex', level: 70 },
    ],
  },
];
