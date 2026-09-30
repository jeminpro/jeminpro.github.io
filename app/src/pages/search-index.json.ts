import { getSearchIndex } from '../utils/helper';

export const prerender = true;

export async function GET() {
	const index = await getSearchIndex();
	return new Response(JSON.stringify(index), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
}
