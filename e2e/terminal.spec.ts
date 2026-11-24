import { expect, type Page, test } from '@playwright/test';

/** 인트로를 건너뛰고 입력 가능한 상태로 만든 뒤 입력창을 반환 */
async function readyTerminal(page: Page) {
  await page.goto('/');
  const terminal = page.locator('[data-terminal]').first();
  await terminal.click();
  await expect(terminal).toHaveAttribute('data-ready', 'true');
  return page.getByRole('textbox', { name: /터미널 명령어 입력/ });
}

test.describe('인터랙티브 터미널', () => {
  test('인트로 이후 help 명령어가 동작해야 함', async ({ page }) => {
    const input = await readyTerminal(page);
    const output = page.getByRole('log', { name: '터미널 출력' });

    await input.fill('help');
    await input.press('Enter');

    await expect(output).toContainText('사용 가능한 명령어 보기');
    await expect(output).toContainText('cd <projects|slug>');
  });

  test('없는 명령어는 command not found를 출력해야 함', async ({ page }) => {
    const input = await readyTerminal(page);

    await input.fill('rm -rf /');
    await input.press('Enter');

    await expect(page.getByRole('log', { name: '터미널 출력' })).toContainText(
      'zsh: command not found: rm'
    );
  });

  test('ls projects 결과 링크로 프로젝트 목록이 표시되어야 함', async ({ page }) => {
    const input = await readyTerminal(page);

    await input.fill('ls projects');
    await input.press('Enter');

    const links = page.getByRole('log', { name: '터미널 출력' }).locator('a[href^="/projects/"]');
    expect(await links.count()).toBeGreaterThan(0);
  });

  test('Tab 자동완성과 ↑ 히스토리가 동작해야 함', async ({ page }) => {
    const input = await readyTerminal(page);

    await input.fill('whoa');
    await input.press('Tab');
    await expect(input).toHaveValue('whoami ');

    await input.press('Enter');
    await expect(input).toHaveValue('');
    await input.press('ArrowUp');
    await expect(input).toHaveValue('whoami');
  });

  test('cd projects 로 프로젝트 페이지에 이동해야 함', async ({ page }) => {
    const input = await readyTerminal(page);

    await input.fill('cd projects');
    await input.press('Enter');

    await expect(page).toHaveURL('/projects');
  });

  test('theme dark 로 다크모드가 적용되고 토글과 동기화되어야 함', async ({ page }) => {
    const input = await readyTerminal(page);

    await input.fill('theme dark');
    await input.press('Enter');

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.getByRole('checkbox', { name: '테마 전환' })).toBeChecked();
  });

  test('clear 로 출력이 지워져야 함', async ({ page }) => {
    const input = await readyTerminal(page);

    await input.fill('clear');
    await input.press('Enter');

    await expect(page.getByRole('log', { name: '터미널 출력' })).toBeEmpty();
  });
});

test.describe('Workflow 섹션', () => {
  test('작업 방식 단계와 저장소 근거가 표시되어야 함', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('section#workflow');

    await expect(section.getByRole('heading', { name: 'AI와 일하는 방식' })).toBeAttached();
    expect(await section.locator('ol > li').count()).toBeGreaterThanOrEqual(5);
    // 규칙 파일 링크는 저장소의 실제 파일을 가리켜야 함
    const ruleLinks = section.locator('a[href*="/blob/main/.claude/rules/"]');
    expect(await ruleLinks.count()).toBeGreaterThan(0);
  });
});
