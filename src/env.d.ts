/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/env.d.ts" />

interface ImportMetaEnv {
  readonly GITHUB_USERNAME: string;
  readonly GITHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
