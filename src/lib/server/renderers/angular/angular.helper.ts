import type { LanguageInterface } from '$lib/server/interfaces/language.interface';
import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';
import lodash from 'lodash';

export function getLanguageLiteralsJson(language: LanguageInterface, data: RawDataType[]) {
	const i18n: { [index: string]: object | string } = {};

	data.forEach(row => {
		lodash.merge(i18n, _transformToObject(row, language))
	});

	return i18n;
}

function _transformToObject(row: RawDataType, language: LanguageInterface) {
	const keyList = (`${ Object.values(row)[0] }`).split('_');
	return {..._getKeyValue(keyList, row, language)};
}

function _getKeyValue(data: string[], row: RawDataType, language: LanguageInterface) {
	const keyValue: { [index: string] : object | string } = {};
	const key = _getNormalizedKey(data[0]);

	if (data.length === 1) {
		keyValue[key] = replaceAndEscapeValues(row[language.name] ?? '');
	} else {
		const aux = _getNextKeyList(data);
		keyValue[key] = {..._getKeyValue(aux, row, language)};
	}

	return keyValue;
}

function _getNextKeyList(key: string[]) {
	return key.slice(1, key.length);
}

function _getNormalizedKey(key: string) {
	return key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`).toUpperCase();
}

export function reformatDynamicValues(literal: string) {
	return literal
		.split('%value%')
		.reduce(
			(acc, value, index, array) =>
				`${acc}${value}${array.length === index + 1 ? `` : `{{ value${index + 1} }}`}`,
			''
		);
}

export function replaceAndEscapeValues(literal: string) {
	return reformatDynamicValues(
		literal
			.replace(/([’´`])/g, "'")
			.replace(/([“”])/g, '\\"')
			.replaceAll('\u00A0', ' ')
	);
}
