import type { RawDataType } from '../../interfaces/raw-data.interface';
import { mkdir, writeFile } from 'node:fs/promises';
import { getLanguageLiteralList, getLanguageRow } from '../../helpers/xlsx.utils';
import { renderFile } from 'template-file';

export async function generateAndroid(data: RawDataType[], path: string) {
	await mkdir(path);
	const languageRow = getLanguageRow(data[0]);
	await Promise.all(
		languageRow.map(async (language) => {
			const literals = getLanguageLiteralList(language, data.slice(1));
			const languageCode = language.code.split('-')[0];
			const fileData = await renderFile('src/lib/server/renderers/android/templates/values.txt', {
				literals
			});
			await mkdir(`${path}/values-${languageCode}`);
			await writeFile(`${path}/values-${languageCode}/values.xml`, fileData);
		})
	);
}
