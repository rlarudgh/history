/**
 * 터미널 컴포넌트(Terminal.astro)의 브라우저 동작.
 * 각 인스턴스는 [data-terminal] 루트 단위로 독립적으로 마운트된다.
 */
import { navigate } from 'astro:transitions/client';
import {
  commonPrefix,
  complete,
  type Effect,
  type Line,
  runCommand,
  type TerminalData,
} from './terminal';
import { applyTheme, getCurrentTheme } from './theme';

const TYPE_SPEED = 45;

const LINE_CLASS: Record<Line['kind'], string> = {
  text: 'text-slate-300',
  muted: 'text-slate-500',
  error: 'text-red-400',
  accent: 'text-blue-400',
  link: 'text-slate-300 hover:text-blue-400 hover:underline underline-offset-4',
};

function readSessionFlag(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string): void {
  try {
    sessionStorage.setItem(key, 'true');
  } catch {
    // 저장소 접근 불가 시 무시
  }
}

function parseIntro(value: string | undefined): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? '[]');
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string')
      : [];
  } catch {
    return [];
  }
}

function renderLine(line: Line): HTMLElement {
  if (line.kind === 'link') {
    const a = document.createElement('a');
    a.href = line.href;
    a.textContent = line.text;
    a.className = `block whitespace-pre-wrap break-words ${LINE_CLASS.link}`;
    if (line.external) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    return a;
  }
  const div = document.createElement('div');
  div.textContent = line.text;
  div.className = `whitespace-pre-wrap break-words ${LINE_CLASS[line.kind]}`;
  return div;
}

function renderPrompt(command: string): HTMLElement {
  const div = document.createElement('div');
  div.className = 'flex gap-2 mt-2 first:mt-0';
  const sign = document.createElement('span');
  sign.className = 'text-blue-400 shrink-0';
  sign.textContent = '$';
  const cmd = document.createElement('span');
  cmd.className = 'text-slate-100 break-all';
  cmd.textContent = command;
  div.append(sign, cmd);
  return div;
}

function applyEffect(effect: Effect, output: HTMLElement): void {
  switch (effect.type) {
    case 'clear':
      output.replaceChildren();
      break;
    case 'navigate':
      if (effect.href.startsWith('mailto:')) window.location.href = effect.href;
      else navigate(effect.href);
      break;
    case 'open':
      window.open(effect.href, '_blank', 'noopener,noreferrer');
      break;
    case 'scroll':
      if (effect.id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(effect.id)?.scrollIntoView({ behavior: 'smooth' });
      break;
    case 'theme': {
      const next =
        effect.value === 'toggle'
          ? getCurrentTheme() === 'dark'
            ? 'light'
            : 'dark'
          : effect.value;
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        // 저장소 접근 불가 시 현재 페이지에만 적용
      }
      document.dispatchEvent(new CustomEvent('theme-applied', { detail: { theme: next } }));
      break;
    }
  }
}

/** 터미널 하나를 마운트한다. signal 이 abort 되면 이벤트와 인트로가 정리된다. */
export function mountTerminal(root: HTMLElement, signal: AbortSignal): void {
  const body = root.querySelector<HTMLElement>('[data-terminal-body]');
  const output = root.querySelector<HTMLElement>('[data-terminal-output]');
  const form = root.querySelector<HTMLFormElement>('[data-terminal-form]');
  const input = root.querySelector<HTMLInputElement>('[data-terminal-input]');
  const dataEl = root.querySelector<HTMLScriptElement>('script[data-terminal-data]');
  if (!body || !output || !form || !input || !dataEl?.textContent) return;

  const data = JSON.parse(dataEl.textContent) as TerminalData;
  const introCommands = parseIntro(root.dataset.intro);
  const introSeenKey = `terminal-intro-seen:${root.dataset.introKey ?? 'default'}`;
  const history: string[] = [];
  let historyCursor = 0;
  let skipIntro = false;

  // 재마운트 시 초기 상태로
  output.replaceChildren();
  input.value = '';
  input.readOnly = true;
  delete root.dataset.ready;

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => {
      if (skipIntro || signal.aborted) return resolve();
      setTimeout(resolve, ms);
    });

  const scrollToBottom = () => {
    body.scrollTop = body.scrollHeight;
  };

  const execute = (command: string, record = true) => {
    output.append(renderPrompt(command));
    if (record && command.trim()) {
      history.push(command.trim());
      historyCursor = history.length;
    }
    const result = runCommand(command, data, history);
    for (const line of result.lines) output.append(renderLine(line));
    if (result.effect) applyEffect(result.effect, output);
    scrollToBottom();
  };

  const runIntro = async () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    skipIntro = reducedMotion || readSessionFlag(introSeenKey);

    if (introCommands.length > 0) await sleep(400);
    for (const command of introCommands) {
      if (signal.aborted) return;
      for (const char of command) {
        if (skipIntro) break;
        input.value += char;
        await sleep(TYPE_SPEED);
      }
      await sleep(220);
      input.value = '';
      execute(command, false);
      await sleep(350);
    }
    if (signal.aborted) return;

    output.append(renderLine({ kind: 'muted', text: "'help'를 입력해 명령어를 확인해 보세요." }));
    input.readOnly = false;
    root.dataset.ready = 'true';
    writeSessionFlag(introSeenKey);
    scrollToBottom();
  };

  // 인트로 중 클릭/키 입력 시 즉시 완료
  const skip = () => {
    skipIntro = true;
  };
  root.addEventListener('pointerdown', skip, { signal });
  root.addEventListener('keydown', skip, { signal });

  // 터미널 아무 곳이나 클릭하면 입력창에 포커스 (링크·텍스트 선택 중이면 제외)
  body.addEventListener(
    'click',
    (event) => {
      if ((event.target as HTMLElement).closest('a')) return;
      if (window.getSelection()?.toString()) return;
      input.focus({ preventScroll: true });
    },
    { signal }
  );

  form.addEventListener(
    'submit',
    (event) => {
      event.preventDefault();
      if (input.readOnly) return;
      const command = input.value;
      input.value = '';
      execute(command);
    },
    { signal }
  );

  input.addEventListener(
    'keydown',
    (event) => {
      if (input.readOnly) return;

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        if (history.length === 0) return;
        event.preventDefault();
        historyCursor =
          event.key === 'ArrowUp'
            ? Math.max(0, historyCursor - 1)
            : Math.min(history.length, historyCursor + 1);
        input.value = history[historyCursor] ?? '';
        return;
      }

      // 빈 입력에서는 Tab을 가로채지 않아 키보드 포커스 이동을 막지 않음
      if (event.key === 'Tab' && input.value.trim()) {
        event.preventDefault();
        const candidates = complete(input.value, data);
        if (candidates.length === 1) {
          input.value = `${candidates[0]} `;
        } else if (candidates.length > 1) {
          const prefix = commonPrefix(candidates);
          if (prefix.length > input.value.length) {
            input.value = prefix;
          } else {
            output.append(renderPrompt(input.value));
            output.append(
              renderLine({
                kind: 'muted',
                text: candidates.map((c) => c.split(' ').pop()).join('  '),
              })
            );
            scrollToBottom();
          }
        }
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        output.replaceChildren();
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'c') {
        if (window.getSelection()?.toString()) return;
        event.preventDefault();
        output.append(renderPrompt(`${input.value}^C`));
        input.value = '';
        scrollToBottom();
        return;
      }

      if (event.key === 'Escape') input.blur();
    },
    { signal }
  );

  runIntro();
}

let controller: AbortController | null = null;

/** 페이지의 모든 터미널을 (재)마운트 */
export function initTerminals(): void {
  controller?.abort();
  controller = new AbortController();
  for (const root of document.querySelectorAll<HTMLElement>('[data-terminal]')) {
    mountTerminal(root, controller.signal);
  }
}

/** 페이지 전환 직전에 정리 */
export function destroyTerminals(): void {
  controller?.abort();
  controller = null;
}
