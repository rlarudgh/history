# Accessibility (a11y) 규칙

## 1. 이미지 alt 속성

모든 이미지는 의미 있는 alt 속성을 가져야 한다.

```astro
<!-- ✅ Correct: 의미 있는 alt -->
<img src="/profile.jpg" alt="홍길동님의 프로필 사진" width="100" height="100" />

<!-- 장식용 이미지는 빈 alt -->
<img src="/decoration.svg" alt="" width="50" height="50" />

<!-- ❌ Incorrect: alt 누락 또는 의미 없음 -->
<img src="/profile.jpg" />
<img src="/icon.png" alt="아이콘" />
```

## 2. 시맨틱 태그 사용

의미에 맞는 HTML 태그를 사용한다.

```astro
<!-- ✅ Correct: 시맨틱 태그 -->
<main>
  <header>
    <h1>사이트 제목</h1>
  </header>

  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">프로젝트 목록</h2>
    <article>...</article>
  </section>

  <footer>
    <p>&copy; 2024 포트폴리오</p>
  </footer>
</main>

<!-- ❌ Incorrect: 의미 없는 태그 -->
<div class="main">
  <div class="header">
    <span class="title">사이트 제목</span>
  </div>
</div>
```

## 3. 버튼 접근성

버튼에는 명확한 텍스트나 aria-label이 필요하다.

```astro
<!-- ✅ Correct: 명확한 텍스트 -->
<button onclick="handleDelete()">삭제</button>

<!-- 아이콘 버튼은 aria-label 필수 -->
<button onclick="handleMenuToggle()" aria-label="메뉴 열기" aria-expanded={isOpen}>
  <MenuIcon />
</button>

<button onclick="handleClose()" aria-label="모달 닫기">
  <XIcon />
</button>

<!-- ❌ Incorrect: 접근성 없는 버튼 -->
<button onclick="handleDelete()">
  <TrashIcon /> <!-- 아이콘만으로 의미 파악 불가능 -->
</button>
```

## 4. 폼 접근성 (연락처 등)

폼 요소는 항상 연결된 label이 있어야 한다.

```astro
<!-- ✅ Correct: label 연결 -->
<label for="email">이메일</label>
<input id="email" type="email" />

<!-- 또는 aria-label 사용 -->
<input type="search" aria-label="검색" placeholder="검색어를 입력하세요" />

<!-- 에러 메시지 연결 -->
<label for="message">메시지</label>
<textarea id="message" aria-invalid={hasError} aria-describedby="message-error"></textarea>
{hasError && (
  <span id="message-error" role="alert">메시지를 입력해주세요</span>
)}

<!-- ❌ Incorrect: label 없음 -->
<input type="email" placeholder="이메일" />
```

## 5. 키보드 접근성

모든 인터랙티브 요소는 키보드로 접근 가능해야 한다.

```astro
<!-- ✅ Correct: 기본 HTML 요소 사용 (자동으로 키보드 접근성 제공) -->
<a href="/projects">프로젝트 보기</a>
<button onclick="handleClick()">클릭</button>

<!-- div를 클릭 가능하게 만드는 경우 -->
<div
  role="button"
  tabindex="0"
  onclick="handleClick()"
  onkeydown="if(event.key === 'Enter' || event.key === ' ') handleClick()"
>
  클릭 가능 영역
</div>

<!-- ❌ Incorrect: 키보드 접근성 없음 -->
<div onclick="handleClick()">클릭 가능하지만 키보드 접근 불가</div>
```

## 6. 색상 대비

텍스트와 배경 간의 색상 대비는 최소 4.5:1 이상이어야 한다.

```css
/* ✅ Correct: 충분한 대비 */
.text-primary {
  color: #1a1a1a; /* 검은색에 가까운 다크 */
  background: #ffffff; /* 흰색 */
  /* 대비비: 19:1 ✓ */
}

.text-secondary {
  color: #555555; /* 다크 그레이 */
  background: #ffffff;
  /* 대비비: 6.8:1 ✓ */
}

/* ❌ Incorrect: 낮은 대비 */
.low-contrast {
  color: #999999; /* 밝은 회색 */
  background: #ffffff;
  /* 대비비: 2.9:1 ✗ WCAG 실패 */
}
```

## 7. ARIA Live 영역

동적으로 변경되는 내용은 스크린 리더가 인식할 수 있도록 한다.

```astro
<!-- ✅ Correct: live region -->
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

<!-- 로딩 상태 -->
<div role="status" aria-label="데이터 로딩 중">
  <span>로딩 중...</span>
</div>

<!-- 에러 알림 -->
<span role="alert" aria-live="assertive">
  {errorMessage}
</span>

<!-- ❌ Incorrect: 시각적으로만 변경 -->
<div class="status-message">{statusMessage}</div>
```

## 8. Focus 관리

모바일 메뉴 등이 열릴 때 focus를 적절히 관리한다.

```astro
<!-- ✅ Correct: 포커스 관리 -->
<header>
  <button id="mobile-menu-btn" aria-label="메뉴 열기" aria-expanded="false">
    <svg>...</svg>
  </button>

  <nav id="mobile-menu" class="hidden" aria-hidden="true">
    <!-- 메뉴 항목들 -->
  </nav>
</header>

<script>
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  btn?.addEventListener('click', () => {
    const isOpen = menu?.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', String(!isOpen));
    menu?.setAttribute('aria-hidden', String(isOpen));
  });
</script>
```

## 9. 스킵 링크

키보드 사용자를 위한 스킵 낵게이션을 제공한다.

```astro
<!-- ✅ Correct: 스킵 링크 -->
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded">
  메인 콘텐츠로 건argnr
</a>

<main id="main-content">
  <!-- 메인 콘텐츠 -->
</main>
```

## 10. 애니메이션 접근성

`prefers-reduced-motion`을 존중한다.

```css
/* ✅ Correct: 모션 줄이기 설정 존중 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```
