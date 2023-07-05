import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtemp, rm, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { generateAndroid } from './android.renderer';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';

describe('Generate android files', () => {
	let tempDirPath: string;

	beforeEach(async () => {
		tempDirPath = await mkdtemp(path.join(os.tmpdir(), 'localizame-test'));
	});

	it('should generate folders for android i18n', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN', Spanish: 'es-ES' },
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado' },
			{ key: 'created', English: 'created', Spanish: 'creado' }
		];

		await generateAndroid(xlsx, path.join(tempDirPath, 'android'));

		const folders = await readdir(path.join(tempDirPath, 'android'));
		expect(folders).toEqual(['values', 'values-en', 'values-es']);
	});

	it('should contain all literals for a language', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN' },
			{ key: 'deleted', English: 'deleted' },
			{ key: 'created', English: 'created' }
		];

		await generateAndroid(xlsx, path.join(tempDirPath, 'android'));

		const fileContent = await readFile(
			path.join(tempDirPath, 'android', 'values-en', 'strings.xml')
		).then((data) => data.toString());

		expect(fileContent).toEqual(`<?xml version="1.0" ?>
<resources>
    <string name="deleted">deleted</string>
    <string name="created">created</string>
</resources>`);
	});

	afterEach(async () => {
		await rm(tempDirPath, { recursive: true, force: true });
	});
});
