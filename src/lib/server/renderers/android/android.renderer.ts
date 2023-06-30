import type { RawDataType } from '../../interfaces/raw-data.interface';
import { mkdir, writeFile, cp } from 'node:fs/promises';
import { getLanguageRow } from '../../helpers/xlsx.utils';
import { getLanguageLiteralList } from './android.helper';
import templating from 'template-file';
import { stringsTemplate } from './android.template';

export async function generateAndroid(data: RawDataType[], path: string) {
	await mkdir(path);
	const languageRow = getLanguageRow(data[0]);
	await Promise.all(
		languageRow.map(async (language, index) => {
			const literals = getLanguageLiteralList(language, data.slice(1));
			const languageCode = language.code.split('-')[0];
			const fileData = await templating.render(stringsTemplate, {
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
