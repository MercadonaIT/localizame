import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const data = await request
		.formData()
		.then((value) => value.get('file'))
		.catch(() => null);
	if (!(data instanceof File)) throw error(400, 'XLSX file missing');
	return json(data);
}
