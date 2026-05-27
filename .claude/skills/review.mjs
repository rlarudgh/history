/**
 * Code Review Skill
 *
 * Performs comprehensive code review of the project or specific files.
 * Can be invoked with: /review [file-path?]
 */

export default async function () {
  const args = arguments[0] || "";

  let reviewTarget = "entire codebase";
  let specificFile = null;

  // Parse arguments
  if (args && args.trim()) {
    specificFile = args.trim();
    reviewTarget = `file: ${specificFile}`;
  }

  return {
    prompt: `Perform a comprehensive code review of the ${reviewTarget}.

## Review Instructions

1. **Check git status and recent changes** to understand what has been modified
2. **Review the following aspects**:

### Code Quality
- Edge cases and error handling
- Business logic correctness
- Data validation and type safety
- Clear failure behavior
- Astro component patterns (proper use of server/client boundaries)

### Security (CRITICAL)
- XSS vulnerabilities (especially with set:html)
- Secrets/credential exposure
- External link security (noopener noreferrer)
- Content Security Policy
- Dependency vulnerabilities

### Architecture & Patterns
- Astro project structure compliance:
  * Correct directory usage (pages/, components/, layouts/, content/)
  * Proper Content Collections usage
  * Component organization (ui/, sections/, layout/)
- Component patterns:
  * Zero JS by default (minimize client scripts)
  * Proper hydration directives (client:visible, etc.)
  * Island architecture principles
- Performance considerations
- Code organization and maintainability

### Project Conventions
- TypeScript strict mode compliance
- Biome linting/formatting compliance
- Naming conventions (PascalCase for components, camelCase for utilities)
- File structure adherence (AGENTS.md 참조)
- Commit message conventions (Conventional Commits)

### Styling
- Tailwind CSS usage patterns
- Responsive design implementation
- Accessibility considerations (contrast, semantic HTML)

### Testing
- E2E test coverage for new pages
- Playwright test quality
- Accessibility testing

3. **Format your output as:**

\`\`\`
## 코드 리뷰 결과

### 📊 리뷰 대상
${reviewTarget}

### 🟢 잘한 점
- [항목 1]
- [항목 2]

### 🟡 개선 제안 (선택사항)
1. **[제안 제목]**
   - 위치: \`파일 경로:줄번호\`
   - 현재: [현재 코드 또는 설명]
   - 제안: [개선 방법]
   - 이유: [왜 개선하는지]
   - 우선순위: [low | medium | high]

### 🔴 해결해야 할 문제 (필수사항)
1. **[문제 제목]**
   - 위치: \`파일 경로:줄번호\`
   - 문제: [설명]
   - 영향: [어떤 문제를 일으키는지]
   - 해결 방안: [구체적인 제안]
   - 심각도: [critical | high | medium | low]

### 🏗️ 아키텍처 검토
${specificFile ? "- [ ] Astro 프로젝트 구조 준수\n- [ ] 올바른 컴포넌트 분리" : "- 각 변경 파일의 프로젝트 구조 준수 여부 검토\n- 컴포넌트 분리 적절성"}

### 🔒 보안 검토
${specificFile ? "- [ ] 보안 취약점 없음" : "- [ ] XSS 취약점 검토\n- [ ] 외부 링크 보안\n- [ ] 민감 정보 노출 검토"}

### 🧪 테스트 검토
- [ ] 새 코드에 대한 E2E 테스트 필요: [파일 또는 기능]
- [ ] 기존 테스트 수정 필요: [파일]
- [ ] 테스트 커버리지 충분: [예/아니오, 이유]

### ✅ 커밋 가능 여부
**결과:** [바로 커밋 가능 | 수정 후 커밋 권장 | 필수 수정 필요]

**이유:** [간단한 설명]

### 📋 요약
- **총 문제:** critical: 0, high: 0, medium: 0, low: 0
- **총 제안:** 0개
- **다음 단계:** [구체적인 액션 아이템]
\`\`\`

## Important Notes

- Focus on HIGH-PRIORITY issues that actually matter
- Don't nitpick style issues (let Biome handle those)
- Be constructive and specific in your feedback
- Provide actionable recommendations with code examples when helpful
- Consider the project context (Astro 6, static site, Content Collections)
- If there are no issues, say so! Not every review needs to find problems
- Remember this is a static portfolio site (not a full application)

${
  specificFile
    ? `
## File-Specific Review

For the file "${specificFile}":
1. Read the file completely
2. Understand its purpose in the architecture
3. Check for issues specific to this file
4. Verify it follows Astro patterns
`
    : `
## Full Codebase Review

For the entire codebase:
1. Check git status to see what files changed
2. Focus review on changed files
3. Consider impacts on other parts of the codebase
4. Check for architectural consistency
`
}
`,
  };
}
