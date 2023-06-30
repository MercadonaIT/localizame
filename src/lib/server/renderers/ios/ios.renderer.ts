import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';
import { mkdir, writeFile } from 'node:fs/promises';
import { getLanguageRow } from '$lib/server/helpers/xlsx.utils';
import {
	getIosGroupedLiteralList,
	getLanguageLiteralList
} from '$lib/server/renderers/ios/ios.helper';
import { renderFile } from 'template-file';

export async function generateIos(data: RawDataType[], path: string) {
	await mkdir(path);
	const languageRow = getLanguageRow(data[0]);
	await Promise.all(
		languageRow.map(async (language) => {
			await mkdir(`${path}/${language.code}.lproj`);
			const literals = getLanguageLiteralList(language, data.slice(1));
			const literalsFile = await renderFile(
				'src/lib/server/renderers/ios/templates/localizable.txt',
				{ literals }
			);
			await writeFile(`${path}/${language.code}.lproj/Localizable.strings`, literalsFile);
		})
	);
	const groups = getIosGroupedLiteralList(data.slice(1));
	const stringsFile = await renderFile('src/lib/server/renderers/ios/templates/strings.txt', {
		groups
	});
	await writeFile(`${path}/String.swift`, stringsFile);
}
