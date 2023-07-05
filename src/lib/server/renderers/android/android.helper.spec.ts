import { describe, expect, it } from 'vitest';
import {
	getLanguageLiteralList,
	reformatDynamicValues,
	replaceAndEscapeValues
} from './android.helper';

describe('Get android literal list', () => {
	it('should get spanish literal list from XLSX', () => {
		const language = { name: 'Spanish', code: 'es' };
		const xlsx = [
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado', Portuguese: 'eliminadiño' },
			{ key: 'created', English: 'created', Spanish: 'creado', Portuguese: 'creadiño' }
		];

		const processedList = getLanguageLiteralList(language, xlsx);
		expect(processedList).toEqual([
			{ key: 'deleted', value: 'eliminado' },
			{ key: 'created', value: 'creado' }
		]);
	});

	it('should get portuguese literal list from XLSX', () => {
		const language = { name: 'Portuguese', code: 'pt' };
		const xlsx = [
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado', Portuguese: 'eliminadiño' },
			{ key: 'created', English: 'created', Spanish: 'creado', Portuguese: 'creadiño' }
		];

		const processedList = getLanguageLiteralList(language, xlsx);
		expect(processedList).toEqual([
			{ key: 'deleted', value: 'eliminadiño' },
			{ key: 'created', value: 'creadiño' }
		]);
	});
});

describe('Reformat android dynamic values', () => {
	it('should only show 1 dynamic value', () => {
		const xlsxValue = 'I hate pizza, I rather eat %value%';
		expect(reformatDynamicValues(xlsxValue)).toEqual('I hate pizza, I rather eat %1$s');
	});

	it('should show 3 dynamic value', () => {
		const xlsxValue = 'I hate pizza, I rather eat %value%, %value% and %value%';
		expect(reformatDynamicValues(xlsxValue)).toEqual(
			'I hate pizza, I rather eat %1$s, %2$s and %3$s'
		);
	});
});

describe('Replace and format android strings', () => {
	it('should always use same single quotes and escape them', () => {
		const xlsxValue = 'Hello, what a `beautiful` day, don´t you think?';
		expect(replaceAndEscapeValues(xlsxValue)).toBe(
			`Hello, what a \\'beautiful\\' day, don\\'t you think?`
		);
	});

	it('should always use same double quotes and escape them', () => {
		const xlsxValue = 'Hello, what a ”beautiful” day, don”t you think?';
		expect(replaceAndEscapeValues(xlsxValue)).toBe(
			`Hello, what a \\"beautiful\\" day, don\\"t you think?`
		);
	});

	it('should replace ... with char …', () => {
		const xlsxValue = 'How about...';
		expect(replaceAndEscapeValues(xlsxValue)).toBe('How about…');
	});
});
