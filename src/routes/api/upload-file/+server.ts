import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { read, utils } from 'xlsx';
import { mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';
import { processAllRenderers } from '$lib/server/helpers/renderer.helper';

export async function POST({ request, url }: RequestEvent) {
	const length = Number(request.headers.get('content-length'));
	if (length > 1e7) throw error(400, 'File cannot exceed 10MB');

	const file = await request
		.formData()
		.then((value) => value.get('file'))
		.catch(() => null);
	if (!(file instanceof File)) throw error(400, 'XLSX file missing');

	const platforms = (url.searchParams.get('platforms') ?? '').split(',').filter((platform) => platform);
	if (!platforms.length) throw error(400, 'Missing platforms param');

	const sheets = read(await file.arrayBuffer());
	const parsedXlsx: RawDataType[] = utils.sheet_to_json(sheets.Sheets[sheets.SheetNames[0]]);
	const workspaceFolder = await mkdtemp(join(tmpdir(), 'localizame-'));

	await processAllRenderers(platforms, parsedXlsx, workspaceFolder);

	return json(workspaceFolder);
}
