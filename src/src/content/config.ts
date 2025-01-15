import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(['Architect', 'Back End', 'Dev Ops', 'DIY', 'Front End', 'General', 'Temp']),		
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()

	// tags: z.array(z.enum(['Front End','Back End','DIY'])),
	// tags: z.array(z.string()),
});

const articleColleection = defineCollection({
	type: 'content',
	schema: articleSchema,
});

const snippetCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		lang: z.enum(['CSS', 'JavaScript', 'C Sharp', 'SQL']),
		description: z.string().optional(),
		publishedDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		draft: z.boolean().optional()

	}),
});

export const collections = { 
	'article': articleColleection,
	'snippet': snippetCollection,
};


// Define the base type inferred from the schema
type ArticleData = z.infer<typeof articleSchema>;

// Extend the type to include `slug`
export type Article = ArticleData & { slug: string };
