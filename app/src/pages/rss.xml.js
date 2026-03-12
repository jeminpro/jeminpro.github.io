import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const runNumber = process.env.GITHUB_RUN_NUMBER;
	const shortSha = process.env.GITHUB_SHA?.slice(0, 7);
	const deploymentVersion = runNumber ? `gha-${runNumber}${shortSha ? ` (${shortSha})` : ''}` : 'local-build';

	const posts = await getCollection('article');
	const postItems = posts.map((post) => ({
		...post.data,
		link: `/articles/${post.id}/`,
		pubDate:post.data.publishedDate
	}));


	return rss({
		title: SITE_TITLE,
		description: `${SITE_DESCRIPTION} (Deploy: ${deploymentVersion})`,
		site: context.site,
		trailingSlash:false,
		items: [...postItems],
	});
}
