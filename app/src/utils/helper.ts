import { getCollection } from 'astro:content';
import fs from "fs";
import path from "path";
import yaml from "yaml";

export async function getPublishedArticles() {
  return await getCollection("article", ({ data }) => !data.draft);
}

export async function getPublishedSnippets() {
  return await getCollection("snippet", ({ data }) => !data.draft);
}

export function normalizeSpaceAndCase(input) {
  return input.replace(' ', '-').toLowerCase();
}

export function getYamlToJsonData(fileLocation) {
  const filePath = path.resolve(fileLocation);
  const fileContents = fs.readFileSync(filePath, "utf8");
  return yaml.parse(fileContents);;
}