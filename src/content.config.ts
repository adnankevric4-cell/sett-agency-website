import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    services: z.array(z.string()),
    industry: z.string(),
    location: z.string(),
    year: z.number(),
    website: z.string(),
    cover: z.string().optional(),
    summary: z.string(),
    order: z.number(),
    heroImage: z.string().optional(),
    challenge: z.string(),
    process: z.string(),
    solution: z.string(),
    results: z.string(),
    testimonials: z.array(z.object({
      quote: z.string(),
      name: z.string(),
      role: z.string(),
    })).optional(),
    gallery: z.array(z.string()).optional(),
    videoSlug: z.string().optional(),
  }),
});

export const collections = { work };
