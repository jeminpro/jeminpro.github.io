import { defineCollection, z } from 'astro:content';

const articleColleection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(['Architect', 'Back End', 'Dev Ops', 'DIY', 'Front End', 'General', 'Temp']),
		// tags: z.array(z.enum(['Front End','Back End','DIY'])),
		// tags: z.array(z.string()),
		publishedDate: z.coerce.date(),	// Transform string to Date object
		updatedDate: z.coerce.date().optional()
	}),
});

const snippetCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		lang: z.enum(['CSS', 'JavaScript', 'C Sharp', 'SQL']),
		description: z.string().optional(),
		publishedDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional()
	}),
});

export const collections = { 
	'article': articleColleection,
	'snippet': snippetCollection,
};
