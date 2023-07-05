import { error } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { read, utils } from 'xlsx';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';
import { processAllRenderers } from '$lib/server/helpers/renderer.helper';
import { zip } from '$lib/server/helpers/zip.helper';
import { isSheetFile } from '$lib/server/helpers/xlsx.helper';
import { RENDERERS } from '$lib/server/const/renderers.const';

export async function POST({ request, url }: RequestEvent) {
	const length = Number(request.headers.get('content-length'));
	if (length > 1e7) throw error(400, 'File cannot exceed 10MB');

	const file = await request
		.formData()
		.then((value) => value.get('file'))
		.catch(() => null);
	if (!(file instanceof File)) throw error(400, 'XLSX file missing');
	if (!isSheetFile(file.type)) throw error(400, 'File must be an XLSX file');

	const platforms = (url.searchParams.get('platforms') ?? '')
		.split(',')
		.filter((platform) => platform);
	if (!platforms.length) throw error(400, 'Missing platforms param');

	const sheets = read(await file.arrayBuffer());
	const parsedXlsx: RawDataType[] = utils.sheet_to_json(sheets.Sheets[sheets.SheetNames[0]]);
	const workspaceFolder = await mkdtemp(join(tmpdir(), 'localizame-'));

	await processAllRenderers(RENDERERS, platforms, parsedXlsx, workspaceFolder).catch(() => {
		rm(workspaceFolder, { recursive: true, force: true });
		throw error(400, 'File might not be formatted properly');
	});

	const zippedCode = await zip(workspaceFolder);
	await rm(workspaceFolder, { recursive: true, force: true });

	return new Response(zippedCode, { status: 200, headers: { 'Content-Type': 'application/zip' } });
}
