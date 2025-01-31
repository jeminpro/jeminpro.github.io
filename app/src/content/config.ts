import { defineCollection, z } from 'astro:content';

const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(['Architect', 'Back End', 'Dev Ops', 'DIY', 'Front End', 'General']),		
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()

	// tags: z.array(z.enum(['Front End','Back End','DIY'])),
	// tags: z.array(z.string()),
});

const snippetSchema = z.object({
	title: z.string(),
	category: z.enum(['C Sharp', 'CSS', 'JavaScript', 'SQL']),
	description: z.string().optional(),
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()
});

const guideSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(['C Sharp', 'CSS', 'JavaScript', 'SQL']),		
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()
});

const articleColleection = defineCollection({
	type: 'content',
	schema: articleSchema
});

const snippetCollection = defineCollection({
	type: 'content',
	schema: snippetSchema
});

const guideCollection = defineCollection({
	type: 'content',
	schema: guideSchema
});

export const collections = { 
	'article': articleColleection,
	'snippet': snippetCollection,
	'guide': guideCollection,
};


type ArticleData = z.infer<typeof articleSchema>;
export type Article = ArticleData & { slug: string };

type SnippetData = z.infer<typeof snippetSchema>;
export type Snippet = SnippetData & { slug: string };

type GuideData = z.infer<typeof guideSchema>;
export type Guide = GuideData & { slug: string };