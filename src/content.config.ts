import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    role: z.string(),
    techStack: z.array(z.string()),
    shortDesc: z.string(),
    category: z.string(),
    features: z.array(z.string()),
    hashtags: z.array(z.string()),
    learnings: z.array(z.string()),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    coverImage: z.string().optional(),
    startDate: z.string(),
    endDate: z.string().optional(),
    isOngoing: z.boolean().default(false),
    order: z.number(),
    screenshots: z.array(z.string()).optional(),
  }),
});

// 블로그 글은 Hololog API(SSR)에서 가져오므로 로컬 콘텐츠 컬렉션을 사용하지 않는다.
export const collections = { projects };
