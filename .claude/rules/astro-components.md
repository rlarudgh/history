# Astro Components 규칙

## 1. 컴포넌트 파일 구조

Astro 컴포넌트는 `.astro` 확장자를 사용하며, 프론트매터(---)와 템플릿으로 구성된다.

```astro
---
// 1. Imports
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

// 2. Props 인터페이스 (선택사항)
interface Props {
  title: string;
  showButton?: boolean;
}

// 3. Props 디스트럭처링
const { title, showButton = true } = Astro.props;

// 4. 데이터 페칭/계산
const projects = await getCollection('projects');
const sortedProjects = projects.sort((a, b) => a.data.order - b.data.order);
---

<!-- 5. 템플릿 마크업 -->
<section class="py-20">
  <h2>{title}</h2>
  {showButton && <a href="/projects">더보기</a>}
</section>

<!-- 6. 클라이언트 스크립트 (필요한 경우에만) -->
<script>
  // 클라이언트 측 JavaScript
</script>
```

## 2. 컴포넌트 명명 규칙

- **PascalCase**: 컴포넌트 파일명 (`ProjectCard.astro`, `HeroSection.astro`)
- **kebab-case**: 일반 페이지/레이아웃 (`main-layout.astro` - 소문자 권장)
- **의미 있는 이름**: 컴포넌트의 역할을 명확히 표현

## 3. Props 정의

인터페이스를 사용하여 Props를 명시적으로 정의한다.

```astro
---
// ✅ Correct: 명확한 Props 인터페이스
interface Props {
  title: string;
  description?: string;
  items: string[];
  variant?: 'default' | 'primary' | 'outline';
}

const {
  title,
  description = '',
  items,
  variant = 'default',
} = Astro.props;
---

<!-- 사용 -->
<Component title="프로젝트" items={['a', 'b']} />

// ❌ Incorrect: Props 타입 없음
const { title, items } = Astro.props;
```

## 4. 데이터 페칭

Astro 컴포넌트는 서버 측에서 실행되므로, 빌드 시점에 데이터를 페칭한다.

```astro
---
// ✅ Correct: 빌드 시점에 데이터 페칭
import { getCollection } from 'astro:content';

const projects = await getCollection('projects');
const sorted = projects.sort((a, b) => a.data.order - b.data.order);
---

<!-- 데이터 사용 -->
<ul>
  {sorted.map((project) => (
    <li>{project.data.title}</li>
  ))}
</ul>
```

## 5. 클라이언트 스크립트

인터랙션이 필요한 경우에만 클라이언트 스크립트를 사용한다.

```astro
<!-- ✅ Correct: 최소한의 클라이언트 스크립트 -->
<button id="toggle-btn">메뉴 열기</button>

<script>
  const btn = document.getElementById('toggle-btn');
  const menu = document.getElementById('mobile-menu');

  btn?.addEventListener('click', () => {
    menu?.classList.toggle('hidden');
  });
</script>

<!-- ❌ Incorrect: 불필요한 클라이언트 스크립트 -->
<!-- 정적 콘텐츠에 JavaScript 불필요 -->
<script>
  console.log('Hello World'); // 불필요
</script>
```

## 6. 슬롯(Slots) 사용

레이아웃이나 재사용 가능한 컴포넌트에서 슬롯을 활용한다.

```astro
---
// Layout.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<!doctype html>
<html lang="ko">
  <head><title>{title}</title></head>
  <body>
    <header>...</header>
    <main>
      <slot /> <!-- 기본 슬롯 -->
    </main>
    <footer>...</footer>
  </body>
</html>

// 사용
<Layout title="홈">
  <h1>환영합니다</h1>
</Layout>
```

## 7. Named Slots

여러 영역이 필요한 경우 named slots를 사용한다.

```astro
---
// Card.astro
interface Props {
  title: string;
}
---

<article class="card">
  <header class="card-header">
    <slot name="header" />
  </header>
  <div class="card-body">
    <slot /> <!-- 기본 슬롯 -->
  </div>
  <footer class="card-footer">
    <slot name="footer" />
  </footer>
</article>

// 사용
<Card title="제목">
  <span slot="header">카드 헤더</span>
  <p>카드 본문</p>
  <span slot="footer">카드 푸터</span>
</Card>
```

## 8. 컴포넌트 가져오기/낳볂기

- 컴포넌트는 기본적으로 named export 없이 파일 자체가 컴포넌트다.
- 유틸리티 함수는 별도의 `.ts` 파일에 작성한다.

```astro
---
// ✅ Correct: 컴포넌트는 파일 자체로 export
// ProjectCard.astro
interface Props {
  title: string;
}
const { title } = Astro.props;
---

<h3>{title}</h3>

// 사용처
import ProjectCard from './ProjectCard.astro';
<ProjectCard title="프로젝트" />
```

## 9. 조걸적 렌더링

Astro에서는 다양한 방식으로 조걸적 렌더링을 할 수 있다.

```astro
---
const isLoggedIn = false;
const items = ['a', 'b', 'c'];
---

<!-- ✅ Correct: 삼항 연산자 -->
{isLoggedIn ? <span>환영합니다</span> : <a href="/login">로그인</a>}

<!-- ✅ Correct: 논리 AND -->
{items.length > 0 && (
  <ul>
    {items.map((item) => <li>{item}</li>)}
  </ul>
)}

<!-- ✅ Correct: 조걸적 속성 -->
<button class={isActive ? 'active' : 'inactive'} disabled={!isEnabled}>
  클릭
</button>
```

## 10. Markdown/MDX 콘텐츠

Content Collections를 사용하여 타입 안전한 콘텐츠를 관리한다.

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.boolean().default(false),
  }),
});

export const collections = { projects };
```

```astro
---
// 프로젝트 상세 페이지
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---

<h1>{project.data.title}</h1>
<article class="prose">
  <Content />
</article>
```

## 11. 성능 고려사항

- **Zero JS by default**: 인터랙션이 필요한 경우에만 클라이언트 스크립트 추가
- **이미지 최적화**: `loading="lazy"` 속성 사용
- **AOS 등 라이브러리**: `client:visible` 디렉티브로 필요한 경우에만 로드

```astro
<!-- ✅ Correct: 이미지 지연 로딩 -->
<img src="/image.jpg" alt="설명" loading="lazy" />

<!-- ✅ Correct: AOS는 클라이언트에서만 로드 -->
<script>
  import AOS from 'aos';
  AOS.init();
</script>
```
