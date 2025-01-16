import { getCollection } from 'astro:content';

export async function getPublishedArticles() {
  return await getCollection("article", ({ data }) => !data.draft);
}

export async function getPublishedSnippets() {
    return await getCollection("snippet", ({ data }) => !data.draft);
  }


  export async function getPublishedGuides() {
    return await getCollection("guide", ({ data }) => !data.draft);
  }