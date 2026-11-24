/**
 * 인터랙티브 터미널 명령어 해석기.
 * DOM과 분리된 순수 로직이며, 화면 처리는 Hero.astro 스크립트가 담당한다.
 */

export interface TerminalProject {
  slug: string;
  title: string;
  category: string;
  year: string;
}

export interface TerminalData {
  name: string;
  role: string;
  field: string;
  careerYears: number;
  tagline: string;
  skills: { category: string; items: string[] }[];
  projects: TerminalProject[];
  socials: { email: string; github: string; linkedin: string };
}

export type Line =
  | { kind: 'text' | 'muted' | 'error' | 'accent'; text: string }
  | { kind: 'link'; text: string; href: string; external?: boolean };

export type Effect =
  | { type: 'navigate'; href: string }
  | { type: 'open'; href: string }
  | { type: 'scroll'; id: string }
  | { type: 'theme'; value: 'dark' | 'light' | 'toggle' }
  | { type: 'clear' };

export interface CommandResult {
  lines: Line[];
  effect?: Effect;
}

export const FILES = ['about.txt', 'role.txt', 'stack.txt', 'contact.txt'] as const;

export const COMMANDS = [
  { name: 'help', usage: 'help', desc: '사용 가능한 명령어 보기' },
  { name: 'whoami', usage: 'whoami', desc: '이름' },
  { name: 'ls', usage: 'ls [projects|skills]', desc: '파일·프로젝트·기술 목록' },
  { name: 'cat', usage: 'cat <file>', desc: '파일 내용 보기 (about.txt 등)' },
  { name: 'cd', usage: 'cd <projects|slug>', desc: '페이지로 이동' },
  { name: 'open', usage: 'open <github|linkedin|email|slug>', desc: '링크 열기' },
  { name: 'contact', usage: 'contact', desc: '연락처 섹션으로 이동' },
  { name: 'theme', usage: 'theme [dark|light]', desc: '테마 전환' },
  { name: 'history', usage: 'history', desc: '입력한 명령어 기록' },
  { name: 'clear', usage: 'clear', desc: '화면 지우기 (Ctrl+L)' },
] as const;

const text = (value: string): Line => ({ kind: 'text', text: value });
const muted = (value: string): Line => ({ kind: 'muted', text: value });
const error = (value: string): Line => ({ kind: 'error', text: value });

function findProject(data: TerminalData, query: string): TerminalProject | undefined {
  const target = query
    .replace(/^projects\//, '')
    .replace(/\/$/, '')
    .toLowerCase();
  return data.projects.find((p) => p.slug.toLowerCase() === target);
}

function listProjects(data: TerminalData): Line[] {
  return data.projects.map((p) => ({
    kind: 'link',
    text: `${p.slug.padEnd(26)} ${p.category} · ${p.year}`,
    href: `/projects/${p.slug}`,
  }));
}

function listSkills(data: TerminalData): Line[] {
  return data.skills.map((group) => text(`${group.category.padEnd(15)} ${group.items.join(', ')}`));
}

function catFile(data: TerminalData, file: string): CommandResult {
  switch (file) {
    case 'about.txt':
      return { lines: [text(data.tagline)] };
    case 'role.txt':
      return { lines: [text(data.role)] };
    case 'stack.txt':
      return { lines: listSkills(data) };
    case 'contact.txt':
      return {
        lines: [
          {
            kind: 'link',
            text: `email     ${data.socials.email}`,
            href: `mailto:${data.socials.email}`,
          },
          {
            kind: 'link',
            text: `github    ${data.socials.github}`,
            href: data.socials.github,
            external: true,
          },
          {
            kind: 'link',
            text: `linkedin  ${data.socials.linkedin}`,
            href: data.socials.linkedin,
            external: true,
          },
        ],
      };
    default:
      return { lines: [error(`cat: ${file || '(없음)'}: No such file or directory`)] };
  }
}

export function runCommand(
  input: string,
  data: TerminalData,
  history: readonly string[] = []
): CommandResult {
  const trimmed = input.trim();
  if (!trimmed) return { lines: [] };

  const [command, ...args] = trimmed.split(/\s+/);
  const arg = args[0] ?? '';

  switch (command.toLowerCase()) {
    case 'help':
      return {
        lines: [
          ...COMMANDS.map((c) => text(`${c.usage.padEnd(34)} ${c.desc}`)),
          muted('Tab: 자동완성 · ↑/↓: 이전 명령어'),
        ],
      };

    case 'whoami':
      return { lines: [text(data.name)] };

    case 'ls': {
      if (!arg || arg === '.' || arg === '~') {
        return { lines: [text([...FILES, 'projects/', 'skills/'].join('  '))] };
      }
      if (/^projects\/?$/.test(arg)) return { lines: listProjects(data) };
      if (/^skills\/?$/.test(arg)) {
        return { lines: [text(data.skills.flatMap((g) => g.items).join('  '))] };
      }
      return { lines: [error(`ls: ${arg}: No such file or directory`)] };
    }

    case 'cat':
      return catFile(data, arg);

    case 'cd': {
      if (!arg || arg === '~' || arg === '/')
        return { lines: [], effect: { type: 'scroll', id: 'top' } };
      if (/^projects\/?$/.test(arg))
        return { lines: [muted('→ /projects')], effect: { type: 'navigate', href: '/projects' } };
      const project = findProject(data, arg);
      if (project) {
        return {
          lines: [muted(`→ /projects/${project.slug}`)],
          effect: { type: 'navigate', href: `/projects/${project.slug}` },
        };
      }
      return { lines: [error(`cd: no such file or directory: ${arg}`)] };
    }

    case 'open': {
      const target = arg.toLowerCase();
      if (target === 'github')
        return {
          lines: [muted(`→ ${data.socials.github}`)],
          effect: { type: 'open', href: data.socials.github },
        };
      if (target === 'linkedin') {
        return {
          lines: [muted(`→ ${data.socials.linkedin}`)],
          effect: { type: 'open', href: data.socials.linkedin },
        };
      }
      if (target === 'email' || target === 'mail') {
        return {
          lines: [muted(`→ ${data.socials.email}`)],
          effect: { type: 'navigate', href: `mailto:${data.socials.email}` },
        };
      }
      const project = findProject(data, arg);
      if (project) {
        return {
          lines: [muted(`→ /projects/${project.slug}`)],
          effect: { type: 'navigate', href: `/projects/${project.slug}` },
        };
      }
      return {
        lines: [
          error(
            `open: ${arg || '(없음)'}: 대상을 찾을 수 없습니다. 'ls projects'로 목록을 확인하세요.`
          ),
        ],
      };
    }

    case 'contact':
      return {
        lines: catFile(data, 'contact.txt').lines,
        effect: { type: 'scroll', id: 'contact' },
      };

    case 'theme': {
      if (arg === 'dark' || arg === 'light')
        return { lines: [muted(`theme: ${arg}`)], effect: { type: 'theme', value: arg } };
      if (!arg)
        return { lines: [muted('theme: toggle')], effect: { type: 'theme', value: 'toggle' } };
      return { lines: [error(`theme: ${arg}: dark 또는 light 를 입력하세요`)] };
    }

    case 'history':
      return { lines: history.map((h, i) => muted(`${String(i + 1).padStart(4)}  ${h}`)) };

    case 'clear':
      return { lines: [], effect: { type: 'clear' } };

    case 'echo':
      return { lines: [text(args.join(' '))] };

    case 'date':
      return { lines: [text(new Date().toLocaleString('ko-KR'))] };

    case 'pwd':
      return { lines: [text(`/home/${data.name}`)] };

    case 'sudo':
      return { lines: [error('sudo: 이 포트폴리오는 읽기 전용입니다 :)')] };

    default:
      return {
        lines: [
          error(`zsh: command not found: ${command}`),
          muted("'help'를 입력하면 명령어 목록을 볼 수 있어요."),
        ],
      };
  }
}

/** 입력 중인 문자열에 대한 자동완성 후보 (전체 입력 문자열로 반환) */
export function complete(input: string, data: TerminalData): string[] {
  const parts = input.split(/\s+/);
  if (parts.length <= 1) {
    const prefix = parts[0] ?? '';
    return COMMANDS.map((c) => c.name).filter((name) => name.startsWith(prefix));
  }

  const [command, ...rest] = parts;
  const prefix = rest.join(' ');
  const slugs = data.projects.map((p) => p.slug);
  const candidatesByCommand: Record<string, string[]> = {
    cat: [...FILES],
    ls: ['projects', 'skills'],
    cd: ['projects', ...slugs],
    open: ['github', 'linkedin', 'email', ...slugs],
    theme: ['dark', 'light'],
  };

  return (candidatesByCommand[command] ?? [])
    .filter((candidate) => candidate.startsWith(prefix))
    .map((candidate) => `${command} ${candidate}`);
}

/** 후보들의 공통 접두사 */
export function commonPrefix(values: string[]): string {
  if (values.length === 0) return '';
  return values.reduce((prefix, value) => {
    let i = 0;
    while (i < prefix.length && i < value.length && prefix[i] === value[i]) i++;
    return prefix.slice(0, i);
  });
}
