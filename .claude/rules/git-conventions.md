# Git Flow 컨벤션

## 브랜치 전략

### 메인 브랜치
- `main`: 프로덕션 배포 브랜치
- `develop`: 개발 통합 브랜치 (필요시)

### 작업 브랜치

#### Feature 브랜치
**형식**: `feature/{간단한-설명}`

새로운 기능을 개발할 때 사용합니다.

```
feature/project-filter
feature/hero-animation
feature/contact-form
```

#### Hotfix 브랜치
**형식**: `hotfix/{버그-설명}`

프로덕션 버그를 긴급 수정할 때 사용합니다.

```
hotfix/build-error
hotfix/mobile-menu
hotfix/image-loading
```

#### Release 브랜치 (선택)
**형식**: `release/{version}`

배포 준비를 할 때 사용합니다.

```
release/v1.0.0
release/v1.1.0
```

#### Fix 브랜치
**형식**: `fix/{버그-설명}`

일반적인 버그 수정 시 사용합니다.

```
fix/button-alignment
fix/typo-error
```

#### Refactor 브랜치
**형식**: `refactor/{리팩토링-내용}`

코드 리팩토링 시 사용합니다.

```
refactor/component-structure
refactor/api-integration
```

#### Chore 브랜치
**형식**: `chore/{작업-내용}`

설정, 문서, 의존성 등의 변경 시 사용합니다.

```
chore/update-dependencies
chore/eslint-config
```

#### Docs 브랜치
**형식**: `docs/{문서-내용}`

문서 작성/수정 시 사용합니다.

```
docs/api-guide
docs/readme-update
```

## 커밋 메시지 컨벤션

### 형식
```
{type}: {간단한 설명}

{상세 설명 (선택)}

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

### Type 종류
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 (포맷팅, 세미콜 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드, 설정 등의 변경

### 예시
```
feat: implement urine test guide page with step-based navigation

- Add GradientLayout with custom gradient background
- Create UrineTestHeader component with camera entry button
- Implement step-based guide system (intro, image, check-strip, read-result, wait)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## 워크플로우

1. **시작**: `main` 브랜치에서 최신 상태 확인
2. **브랜치 생성**: `git checkout -b feature/{기능명}`
3. **개발**: 기능 구현 및 커밋
4. **완료**: `main`으로 PR/merge
5. **정리**: merged 브랜치 삭제

## 브랜치 네이밍 규칙
- 소문자 사용
- 단어는 하이픈(-)으로 구분
- 영어로 작성 (가능한 경우)
- 간결하고 명확하게: 50자 이내 권장
