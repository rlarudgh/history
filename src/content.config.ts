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

const blog = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    category: z.string(),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

export const collections = { projects, blog };
