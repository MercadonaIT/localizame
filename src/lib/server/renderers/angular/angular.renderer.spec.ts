import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtemp, rm, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { generateAngular } from '$lib/server/renderers/angular/angular.renderer';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';

describe('Generate angular files', () => {
	let tempDirPath: string;

	beforeEach(async () => {
		tempDirPath = await mkdtemp(path.join(os.tmpdir(), 'localizame-test'));
	});

	it('should generate folders for angular i18n', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN', Spanish: 'es-ES' },
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado' },
			{ key: 'created', English: 'created', Spanish: 'creado' }
		];

		await generateAngular(xlsx, path.join(tempDirPath, 'angular'));

		const folders = await readdir(path.join(tempDirPath, 'angular'));
		expect(folders).toEqual(['en.json', 'es.json']);
	});

	it('should contain all literals for a language', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN' },
			{ key: 'deleted', English: 'deleted' },
			{ key: 'created', English: 'created' }
		];

		await generateAngular(xlsx, path.join(tempDirPath, 'angular'));

		const fileContent = await readFile(
			path.join(tempDirPath, 'angular', '', 'en.json')
		).then((data) => data.toString());

		expect(fileContent).toEqual(`{\n  "DELETED": "deleted",\n  "CREATED": "created"\n}`);
	});

	afterEach(async () => {
		await rm(tempDirPath, { recursive: true, force: true });
	});
});
