import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtemp, rm, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';
import { generateIos } from './ios.renderer';

describe('Generate ios files', () => {
	let tempDirPath: string;

	beforeEach(async () => {
		tempDirPath = await mkdtemp(path.join(os.tmpdir(), 'localizame-test'));
	});

	it('should generate folders and files for ios i18n', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN', Spanish: 'es-ES' },
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado' },
			{ key: 'created', English: 'created', Spanish: 'creado' }
		];

		await generateIos(xlsx, path.join(tempDirPath, 'ios'));

		const folders = await readdir(path.join(tempDirPath, 'ios'));
		expect(folders).toEqual(['Strings.swift', 'en-EN.lproj', 'es-ES.lproj']);
	});

	it('should contain all grouped literals', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN', Spanish: 'es-ES' },
			{ key: 'common_deleted', English: 'deleted', Spanish: 'eliminado' },
			{ key: 'common_created', English: 'created', Spanish: 'creado' }
		];

		await generateIos(xlsx, path.join(tempDirPath, 'ios'));

		const file = await readFile(path.join(tempDirPath, 'ios', 'Strings.swift')).then((data) =>
			data.toString()
		);
		expect(file).toEqual(`import UIKit
protocol Localizable: CustomStringConvertible {
    var rawValue: String { get }
}

extension Localizable {
    var localized: String {
        return NSLocalizedString(self.rawValue, comment: "")
    }

    var uppercased: String {
        return self.localized.uppercased()
    }

    var description: String {
        return self.localized
    }

    func localized(with: CVarArg...) -> String {
        let text = String(format: self.localized, arguments: with)
        return text
    }
}

extension String {
    public enum common: String, Localizable {
            case deleted = "common_deleted"
            case created = "common_created"
    }
}`);
	});

	it('should contain all translated strings', async () => {
		const xlsx: RawDataType[] = [
			{ English: 'en-EN', Spanish: 'es-ES' },
			{ key: 'common_deleted', English: 'deleted', Spanish: 'eliminado' },
			{ key: 'common_created', English: 'created', Spanish: 'creado' }
		];

		await generateIos(xlsx, path.join(tempDirPath, 'ios'));

		const file = await readFile(
			path.join(tempDirPath, 'ios', 'es-ES.lproj', 'Localizable.strings')
		).then((data) => data.toString());

		expect(file).toBe(`"common_deleted" = "eliminado";
"common_created" = "creado";`);
	});

	afterEach(async () => {
		await rm(tempDirPath, { recursive: true, force: true });
	});
});
