import { getCollection, render, type CollectionEntry } from 'astro:content';
import fs from "fs";
import path from "path";
import yaml from "yaml";

export async function getPublishedArticles() {
  return await getCollection("article", ({ data }) => !data.draft);
}

export async function getPublishedSnippets() {
  return await getCollection("snippet", ({ data }) => !data.draft);
}

export async function getSearchIndex() {
  const articles = await getPublishedArticles();
  const snippets = await getPublishedSnippets();

  const toEntry = async <C extends "article" | "snippet">(
    entry: CollectionEntry<C>,
    type: C,
    urlPrefix: string,
  ) => {
    const { headings } = await render(entry);
    return {
      type,
      title: entry.data.title,
      url: `${urlPrefix}/${entry.id}`,
      headings: headings.map(({ text, slug, depth }) => ({ text, slug, depth })),
    };
  };

  const articleEntries = await Promise.all(
    articles.map((entry) => toEntry(entry, "article", "/articles"))
  );
  const snippetEntries = await Promise.all(
    snippets.map((entry) => toEntry(entry, "snippet", "/snippets"))
  );

  return [...articleEntries, ...snippetEntries];
}

export function normalizeSpaceAndCase(input: string) {
  return input.replace(' ', '-').toLowerCase();
}

export function getYamlToJsonData(fileLocation: string) {
  const filePath = path.resolve(fileLocation);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.parse(fileContents);
}