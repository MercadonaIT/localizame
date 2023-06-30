import type { RawDataType } from '../../interfaces/raw-data.interface';
import { mkdir, writeFile, cp } from 'node:fs/promises';
import { getLanguageRow } from '../../helpers/xlsx.utils';
import { renderFile } from 'template-file';
import { getLanguageLiteralList } from './android.helper';

export async function generateAndroid(data: RawDataType[], path: string) {
	await mkdir(path);
	const languageRow = getLanguageRow(data[0]);
	await Promise.all(
		languageRow.map(async (language, index) => {
			const literals = getLanguageLiteralList(language, data.slice(1));
			const languageCode = language.code.split('-')[0];
			const fileData = await renderFile('src/lib/server/renderers/android/templates/strings.txt', {
				literals
			});
			await mkdir(`${path}/values-${languageCode}`);
			await writeFile(`${path}/values-${languageCode}/strings.xml`, fileData);

			// First column is default language as well
			if (index === 0) {
				await cp(`${path}/values-${languageCode}`, `${path}/values`, { recursive: true });
			}
		})
	);
}
