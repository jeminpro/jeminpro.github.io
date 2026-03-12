import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import {getYamlToJsonData} from "./utils/helper";
import { glob } from 'astro/loaders';

const tagsData = getYamlToJsonData("./src/data/tags.yaml");

// const tagsData = yaml.parse(fs.readFileSync(tagsFilePath, 'utf8')) as {
// 	articles: [string, ...string[]];
// 	snippets: [string, ...string[]];
// };

const articleSchema = z.object({
	title: z.string(),
	description: z.string(),
	category: z.enum(tagsData.articles),
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional()
});

const snippetSchema = z.object({
	title: z.string(),
	category: z.enum(tagsData.snippets),
	description: z.string().optional(),
	publishedDate: z.coerce.date(),
	updatedDate: z.coerce.date().optional(),
	draft: z.boolean().optional(),
});

const articleColleection = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/article' }),
	schema: articleSchema
});

const snippetCollection = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/snippet' }),
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
