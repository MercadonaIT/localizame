import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { zip } from './zip.helper';

describe('Zip local folder', () => {
	let tempDirPath: string;

	beforeEach(async () => {
		tempDirPath = await mkdtemp(path.join(os.tmpdir(), 'localizame-test'));
	});

	it('should pack files in zip', async () => {
		await writeFile(path.join(tempDirPath, 'test1'), 'hello');
		await writeFile(path.join(tempDirPath, 'test1'), 'hello');
		await writeFile(path.join(tempDirPath, 'test1'), 'hello');

		const builtZip = await zip(tempDirPath);
		expect(builtZip.byteLength).toBe(115);
	});

	afterEach(async () => {
		await rm(tempDirPath, { recursive: true, force: true });
	});
});
