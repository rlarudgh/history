/**
 * Hololog Blog API 클라이언트
 *
 * 블로그 글/태그를 외부 Hololog API에서 가져온다.
 * SSR(요청 시점)에서만 호출되므로 API 키는 서버에만 머문다.
 *
 * 환경변수:
 * - HOLOLOG_API_URL  (기본: https://hololog.vercel.app)
 * - HOLOLOG_API_KEY  (읽기 키, 필수)
 *
 * 값은 실행 시점의 Cloudflare 바인딩(`cloudflare:workers` 의 `env`)에서만 읽는다.
 * - 배포: Cloudflare 대시보드의 Secret(암호화된 변수)으로 설정
 * - 로컬 dev: 프로젝트 루트의 `.dev.vars` 파일 (gitignore 대상)
 *
 * ⚠️ `import.meta.env` 로 읽으면 빌드 시점 값이 서버 번들에 문자열로 박히므로 사용하지 않는다.
 */

export interface PostSummary {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Post extends PostSummary {
  content: string;
}

export interface BlogTag {
  name: string;
  slug: string;
}

export interface HolologConfig {
  baseUrl: string;
  apiKey: string;
}

type EnvLike = Record<string, string | undefined>;

const DEFAULT_BASE_URL = 'https://hololog.vercel.app';

/** 실행 시점 바인딩에서 API 설정을 읽는다. (빌드 시점 값은 사용하지 않음) */
export function getHolologConfig(runtimeEnv?: EnvLike): HolologConfig {
  const env: EnvLike = runtimeEnv ?? {};
  return {
    baseUrl: (env.HOLOLOG_API_URL || DEFAULT_BASE_URL).replace(/\/$/, ''),
    apiKey: env.HOLOLOG_API_KEY || '',
  };
}

/** API 키 존재 여부 (미설정 시 페이지에서 안내 표시) */
export function isHolologConfigured(config: HolologConfig): boolean {
  return Boolean(config.apiKey);
}

async function apiFetch<T>(path: string, config: HolologConfig): Promise<T> {
  const res = await fetch(`${config.baseUrl}${path}`, {
    headers: { 'x-api-key': config.apiKey },
  });
  if (!res.ok) {
    throw new Error(`Hololog API ${res.status} ${res.statusText} (${path})`);
  }
  return res.json() as Promise<T>;
}

/** 발행된 글 목록 (본문 제외) */
export async function getPosts(config: HolologConfig): Promise<PostSummary[]> {
  const data = await apiFetch<{ posts: PostSummary[] }>('/api/posts', config);
  return data.posts ?? [];
}

/** 글 단건 (본문 포함). 없으면 null */
export async function getPost(slug: string, config: HolologConfig): Promise<Post | null> {
  try {
    const data = await apiFetch<{ post: Post }>(`/api/posts/${encodeURIComponent(slug)}`, config);
    return data.post ?? null;
  } catch (error) {
    // 404 등은 글 없음으로 처리
    if (error instanceof Error && error.message.includes('404')) return null;
    throw error;
  }
}

/** 태그 목록 */
export async function getTags(config: HolologConfig): Promise<BlogTag[]> {
  const data = await apiFetch<{ tags: BlogTag[] }>('/api/tags', config);
  return data.tags ?? [];
}
