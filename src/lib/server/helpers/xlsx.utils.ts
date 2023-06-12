import type { RawDataType } from '../interfaces/raw-data.interface';
import type { LanguageInterface } from '../interfaces/language.interface';
import { escapeString } from '$lib/server/helpers/string.helper';

export function isSheetFile(fileType: string) {
	const admittedFormats = [
		'application/excel',
		'application/vnd.ms-excel',
		'application/x-excel',
		'application/x-msexcel',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	];
	return admittedFormats.includes(fileType);
}

export function getLanguageRow(data: RawDataType): LanguageInterface[] {
	return Object.keys(data).map((key) => ({
		name: key,
		code: data[key]
	}));
}

export function getLanguageLiteralList(language: LanguageInterface, data: RawDataType[]) {
	return data.map((row) => ({
		key: escapeString(Object.values(row)[0]),
		value: escapeString(row[language.name])
	}));
}
