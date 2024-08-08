import { defineCollection, z } from 'astro:content';

const article = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// tags: z.array(z.enum(['Front End','Back End','DIY'])),
		// tags: z.array(z.string()),
		publishedDate: z.coerce.date(),	// Transform string to Date object
		updatedDate: z.coerce.date().optional()
	}),
});

export const collections = { article };
