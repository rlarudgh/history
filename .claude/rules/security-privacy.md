# Security & Privacy 규칙

## 1. 환경 변수 관리

정적 사이트(Astro)에서는 빌드 시점에 환경 변수가 처리되므로, 클라이언트에 노출되면 안 되는 값은 서버 측에서만 사용해야 한다.

```typescript
// ✅ Correct: 빌드 시점에만 사용 (서버 측)
// .env
PRIVATE_API_KEY=sk_test_xxx

// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // 빌드 시점에만 접근 가능
  site: process.env.PUBLIC_SITE_URL,
});

// ❌ Incorrect: 클라이언트에 노출되는 환경 변수
// .env
PUBLIC_PRIVATE_KEY=should_not_be_public

// 클라이언트 코드에서 사용 (브라우저에 노출됨)
const secret = import.meta.env.PUBLIC_PRIVATE_KEY;
```

## 2. XSS 방지

Astro는 기본적으로 HTML을 이스케이프하므로 안전하지만, `set:html`을 사용할 때는 주의가 필요하다.

```astro
---
// ✅ Correct: 자동 이스케이프
const userInput = '<script>alert("xss")</script>';
---
<p>{userInput}</p> <!-- 자동으로 이스케이프됨 -->

// ✅ Correct: 안전한 콘텐츠만 set:html 사용
---
import DOMPurify from 'isomorphic-dompurify';

const rawHtml = '<p>안녕하세요</p>';
const sanitized = DOMPurify.sanitize(rawHtml);
---
<article set:html={sanitized} />

// ❌ Incorrect: 살균 없이 사용
<article set:html={userInput} />
```

## 3. 보안 헤더

Cloudflare Pages `_headers` 파일을 통해 보안 헤더를 설정한다.

```
# public/_headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
```

## 4. 에러 핸들링

보안을 위해 상세한 에러 정보를 사용자에게 노출하지 않는다.

```typescript
// ✅ Correct: 사용자 친화적 에러 메시지
export async function getProjectData(slug: string) {
  try {
    const project = await getCollection('projects', { slug });
    if (!project) throw new Error('Project not found');
    return project;
  } catch (error) {
    // 서버 로그는 서버만 확인
    console.error('[getProjectData] Error:', error);
    // 사용자에게는 일반화된 메시지
    throw new Error('프로젝트 정보를 불러올 수 없습니다');
  }
}

// ❌ Incorrect: 상세 에러 노출
export async function getProjectData(slug: string) {
  try {
    // ...
  } catch (error) {
    // ❌ 스택 트레이스 노출 - 보안 취약점
    throw new Error(`DB Error: ${error.message}\n${error.stack}`);
  }
}
```

## 5. 외부 링크 보안

외부 링크에는 반드시 `rel="noopener noreferrer"`를 추가한다.

```astro
<!-- ✅ Correct: 안전한 외부 링크 -->
<a href="https://github.com" target="_blank" rel="noopener noreferrer">
  GitHub
</a>

<!-- ❌ Incorrect: 보안 속성 없음 -->
<a href="https://github.com" target="_blank">
  GitHub
</a>
```

## 6. 데이터 유출 방지

프로젝트 콘텐츠(MDX)에 민감한 개인정보가 포함되지 않도록 주의한다.

```yaml
---
# ✅ Correct: 공개 가능한 정볼만 포함
title: "쇼핑몰 플랫폼 리뉴얼"
company: "ABC 커머스"  # 회사명은 OK
role: "프론트엔드 개발"
techStack: ["Next.js", "TypeScript"]

# ❌ Incorrect: 민감 정보 포함
title: "납품 프로젝트"
company: "XYZ 금융"  # 계약상 비밀 유지 필요
internal-url: "https://internal.company.com/secret"  # 납부 URL
client-api-key: "sk-live-xxx"  # API 키
---
```
