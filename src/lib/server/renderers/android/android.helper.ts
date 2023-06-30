import type { LanguageInterface } from '$lib/server/interfaces/language.interface';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';

export function getLanguageLiteralList(language: LanguageInterface, data: RawDataType[]) {
	return data.map((row) => ({
		key: Object.values(row)[0],
		value: replaceAndEscapeValues(row[language.name] ?? '')
	}));
}

export function reformatDynamicValues(literal: string) {
	return literal
		.split('%value%')
		.reduce(
			(acc, value, index, array) =>
				`${acc}${value}${array.length === index + 1 ? `` : `%${index + 1}$s`}`,
			''
		);
}

export function replaceAndEscapeValues(literal: string) {
	return reformatDynamicValues(
		literal
			.replace(/([’´`])/g, "'")
			.replace(/([“”])/g, '"')
			.replace(/(["'])/g, '\\$&')
			.replaceAll('\u00A0', ' ')
			.replaceAll('...', '…')
	);
}
