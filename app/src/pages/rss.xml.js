import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('article');
	const postItems = posts.map((post) => ({
		...post.data,
		link: `/articles/${post.slug}/`,
		pubDate:post.data.publishedDate
	}));


	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		trailingSlash:false,
		items: [...postItems],
	});
}
