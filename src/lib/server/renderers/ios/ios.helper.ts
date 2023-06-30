import type { LanguageInterface } from '$lib/server/interfaces/language.interface';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';

export function getLanguageLiteralList(language: LanguageInterface, data: RawDataType[]) {
	return data.map((row) => ({
		key: escapeString(Object.values(row)[0]),
		value: escapeString(row[language.name])
	}));
}

export function escapeString(str: string): string {
	return (str + '').replace(/[\\"']/g, '\\$&').replace(/u0000/g, '\\0');
}

export function getIosGroupedLiteralList(data: RawDataType[]) {
	const uniqueGroups = [
		...new Set(
			data.map((row) => Object.values(row)[0]).map((literalKey) => literalKey.split('_')[0])
		)
	];
	return uniqueGroups.map((groupKey) => ({
		name: groupKey,
		literals: data
			.map((row) => Object.values(row)[0])
			.filter((literalKey) => literalKey.split('_')[0] === groupKey)
			.map((literalKey) => ({
				group: literalKey.split('_').slice(1).join('_'),
				value: literalKey
			}))
	}));
}
