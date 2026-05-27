# Tailwind CSS 사용 규칙

## 1. 유틸리티 클래스 우선

Tailwind CSS의 유틸리티 클래스를 우선적으로 사용하며, 불필요한 커스텀 CSS를 지양한다.

```astro
<!-- ✅ Correct: Tailwind 유틸리티 사용 -->
<div class="max-w-6xl mx-auto px-4 py-20">
  <h1 class="text-3xl font-bold text-slate-900 mb-4">제목</h1>
  <p class="text-slate-600 leading-relaxed">본문 내용</p>
</div>

<!-- ❌ Incorrect: 인라인 스타일 또는 불필요한 CSS -->
<div style="max-width: 1200px; margin: 0 auto; padding: 80px 16px;">
  <h1 style="font-size: 30px; font-weight: bold; color: #1a1a1a;">제목</h1>
</div>
```

## 2. 클래스 순서

관련된 클래스를 그룹화하여 가독성을 높인다.

```astro
<!-- ✅ Correct: 논리적 그룹화 -->
<div class="
  /* 레이아웃 */
  flex items-center justify-between
  /* 크기/간격 */
  w-full h-16 px-4
  /* 시각적 */
  bg-white border-b border-slate-200
  /* 인터랙션 */
  hover:bg-slate-50 transition-colors
">

<!-- ❌ Incorrect: 무작위 순서 -->
<div class="bg-white flex justify-between border-b w-full h-16 items-center px-4 border-slate-200">
```

## 3. 반응형 디자인

모바일 퍼스트 접근법을 사용한다.

```astro
<!-- ✅ Correct: 모바일 퍼스트 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 기본: 1열 (모바일) -->
  <!-- md: 2열 (태블릿) -->
  <!-- lg: 3열 (데스크탑) -->
</div>

<!-- ✅ Correct: 반응형 텍스트 -->
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">
  반응형 제목
</h1>

<!-- ✅ Correct: 반응형 패딩 -->
<section class="py-12 md:py-20 lg:py-28">
  <div class="px-4 sm:px-6 lg:px-8">
    <!-- 콘텐츠 -->
  </div>
</section>
```

## 4. 색상 팔레트

프로젝트의 색상 팔레트를 일관되게 사용한다.

```astro
<!-- ✅ Correct: slate + blue 팔레트 사용 -->
<!-- 주요 색상: slate-900 (텍스트), slate-600 (보조 텍스트), slate-50 (배경) -->
<!-- 강조 색상: blue-600 (버튼, 링크), blue-50 (배경 강조) -->

<!-- 텍스트 -->
<h1 class="text-slate-900">주요 제목</h1>
<p class="text-slate-600">보조 텍스트</p>
<span class="text-slate-500">메타 정보</span>

<!-- 배경 -->
<div class="bg-white">메인 배경</div>
<div class="bg-slate-50">섹션 배경</div>
<div class="bg-blue-50">강조 배경</div>

<!-- 버튼 -->
<button class="bg-blue-600 text-white hover:bg-blue-700">
  주요 버튼
</button>
<button class="bg-white text-slate-700 border border-slate-300 hover:bg-slate-50">
  보조 버튼
</button>
```

## 5. 상태 변화

hover, focus, active 상태를 적절히 활용한다.

```astro
<!-- ✅ Correct: 상태 변화 -->
<a href="/projects" class="
  text-slate-600
  hover:text-blue-600
  transition-colors
  duration-200
">
  프로젝트 보기
</a>

<button class="
  bg-blue-600
  text-white
  hover:bg-blue-700
  active:bg-blue-800
  focus:outline-none
  focus:ring-2
  focus:ring-blue-500
  focus:ring-offset-2
  transition-colors
">
  클릭
</button>
```

## 6. 공통 패턴

자주 사용하는 패턴은 클래스로 추출하지 않고, 컴포넌트화한다.

```astro
---
// ✅ Correct: Astro 컴포넌트로 추출
// components/ui/Tag.astro
interface Props {
  label: string;
  variant?: 'default' | 'primary' | 'outline';
}

const { label, variant = 'default' } = Astro.props;

const variantClasses = {
  default: 'bg-slate-100 text-slate-700',
  primary: 'bg-blue-50 text-blue-700',
  outline: 'border border-slate-300 text-slate-600',
};
---

<span class={`inline-block px-3 py-1 text-xs font-medium rounded-full ${variantClasses[variant]}`}>
  {label}
</span>
```

## 7. 다크 모드 (현재 미사용)

현재 프로젝트는 다크 모드를 지원하지 않는다. 향후 추가 시:

```astro
<!-- 다크 모드 예시 (향후 사용 가능) -->
<div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
  다크 모드 지원 콘텐츠
</div>
```

## 8. @apply 사용 지양

Tailwind CSS v4에서는 `@apply` 사용을 지양한다. 대신 컴포넌트를 분리하거나, 인라인 클래스를 사용한다.

```astro
<!-- ✅ Correct: 인라인 클래스 사용 -->
<div class="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm">
  <img src="/avatar.jpg" class="w-12 h-12 rounded-full" alt="프로필" />
  <div>
    <h3 class="font-semibold text-slate-900">홍길동</h3>
    <p class="text-sm text-slate-500">프론트엔드 개발자</p>
  </div>
</div>

<!-- ❌ Incorrect: @apply 사용 (Tailwind v4에서 비권장) -->
<style>
  .profile-card {
    @apply flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm;
  }
</style>
```

## 9. 접근성 고려

색상 대비와 폰트 크기를 고려한다.

```astro
<!-- ✅ Correct: 충분한 색상 대비 -->
<p class="text-slate-600 bg-white">
  <!-- 대비비: 6.8:1 (WCAG AA 통과) -->
  가독성 좋은 텍스트
</p>

<!-- ✅ Correct: 적절한 폰트 크기 -->
<h1 class="text-3xl md:text-4xl font-bold">제목 (32-48px)</h1>
<h2 class="text-2xl font-bold">부제목 (24px)</h2>
<p class="text-base leading-relaxed">본문 (16px, 줄간격 1.625)</p>
<span class="text-sm">보조 텍스트 (14px)</span>
```

## 10. 성능 최적화

불필요한 클래스를 피하고, JIT 컴파일러를 신뢰한다.

```astro
<!-- ✅ Correct: 필요한 클래스만 사용 -->
<div class="flex items-center gap-2">
  <!-- 필요한 flex 속성만 -->
</div>

<!-- ❌ Incorrect: 불필요한 클래스 -->
<div class="flex flex-row items-center justify-start gap-x-2 gap-y-0">
  <!-- 기본값 중복 -->
</div>
```
