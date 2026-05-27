export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'Web & WebView',
    items: ['React', 'Next.js', 'Vue2', 'Astro'],
  },
  {
    category: 'App(Native)',
    items: ['Kotlin', 'Flutter', 'React-Native'],
  },
  {
    category: 'Server',
    items: ['Nest.js', 'Spring boot', 'Fast API', 'MySQL', 'PostgreSQL', 'sqlite', 'golang'],
  },
  {
    category: 'Etc',
    items: ['Git', 'Figma', 'Jira', 'Claude Code', 'Codex'],
  },
];
