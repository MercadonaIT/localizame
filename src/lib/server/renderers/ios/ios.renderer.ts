import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';
import { mkdir, writeFile } from 'node:fs/promises';
import { getLanguageRow } from '$lib/server/helpers/xlsx.utils';
import {
	getIosGroupedLiteralList,
	getLanguageLiteralList
} from '$lib/server/renderers/ios/ios.helper';
import templating from 'template-file';
import { localizableTemplate, stringsTemplate } from './ios.template';

export async function generateIos(data: RawDataType[], path: string) {
	await mkdir(path);
	const languageRow = getLanguageRow(data[0]);
	await Promise.all(
		languageRow.map(async (language) => {
			await mkdir(`${path}/${language.code}.lproj`);
			const literals = getLanguageLiteralList(language, data.slice(1));
			const literalsFile = await templating.render(localizableTemplate, { literals });
			await writeFile(`${path}/${language.code}.lproj/Localizable.strings`, literalsFile);
		})
	);
	const groups = getIosGroupedLiteralList(data.slice(1));
	const stringsFile = await templating.render(stringsTemplate, {
		groups
	});
	await writeFile(`${path}/String.swift`, stringsFile);
}
