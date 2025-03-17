import { defineCollection, z } from 'astro:content';
import {getYamlToJsonData} from "../utils/helper";

const tagsData = getYamlToJsonData("./src/data/tags.yaml");

const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(tagsData.articles),		
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()

	// tags: z.array(z.string()),
});

const snippetSchema = z.object({
	title: z.string(),
	category: z.enum(tagsData.snippets),
	description: z.string().optional(),
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

export const collections = { 
	'article': articleColleection,
	'snippet': snippetCollection,
};


type ArticleData = z.infer<typeof articleSchema>;
export type Article = ArticleData & { slug: string };

type SnippetData = z.infer<typeof snippetSchema>;
export type Snippet = SnippetData & { slug: string };
