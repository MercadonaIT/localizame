import type { RawDataType } from '../interfaces/raw-data.interface';
import type { LanguageInterface } from '../interfaces/language.interface';

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
