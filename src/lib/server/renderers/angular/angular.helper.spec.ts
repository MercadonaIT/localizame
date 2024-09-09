import { describe, expect, it } from 'vitest';
import {
	getLanguageLiteralsJson,
	reformatDynamicValues,
	replaceAndEscapeValues
} from './angular.helper';

describe('Get angular literal list', () => {
	it('should get spanish literal list from XLSX', () => {
		const language = { name: 'Spanish', code: 'es' };
		const xlsx = [
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado', Portuguese: 'eliminadiño' },
			{ key: 'created', English: 'created', Spanish: 'creado', Portuguese: 'creadiño' }
		];

		const processedList = getLanguageLiteralsJson(language, xlsx);
		expect(processedList).toEqual({
			"CREATED": 'creado',
			"DELETED": 'eliminado'
		});
	});

	it('should get portuguese literal list from XLSX', () => {
		const language = { name: 'Portuguese', code: 'pt' };
		const xlsx = [
			{ key: 'deleted', English: 'deleted', Spanish: 'eliminado', Portuguese: 'eliminadiño' },
			{ key: 'created', English: 'created', Spanish: 'creado', Portuguese: 'creadiño' }
		];

		const processedList = getLanguageLiteralsJson(language, xlsx);
		expect(processedList).toEqual({
			"DELETED": 'eliminadiño',
			"CREATED": 'creadiño'
		});
	});
});

describe('Reformat angular dynamic values', () => {
	it('should only show 1 dynamic value', () => {
		const xlsxValue = 'I hate pizza, I rather eat %value%';
		expect(reformatDynamicValues(xlsxValue)).toEqual('I hate pizza, I rather eat {{ value1 }}');
	});

	it('should show 3 dynamic value', () => {
		const xlsxValue = 'I hate pizza, I rather eat %value%, %value% and %value%';
		expect(reformatDynamicValues(xlsxValue)).toEqual(
			'I hate pizza, I rather eat {{ value1 }}, {{ value2 }} and {{ value3 }}'
		);
	});
});

describe('Replace and format angular strings', () => {
	it('should always use same single quotes and escape them', () => {
		const xlsxValue = 'Hello, what a `beautiful` day, don´t you think?';
		expect(replaceAndEscapeValues(xlsxValue)).toBe(
			`Hello, what a 'beautiful' day, don't you think?`
		);
	});

	it('should always use same double quotes and escape them', () => {
		const xlsxValue = `Hello, what a ”beautiful” day, don't you think?`;
		expect(replaceAndEscapeValues(xlsxValue)).toBe(
			`Hello, what a \\"beautiful\\" day, don't you think?`
		);
	});

	it('should replace ... with char …', () => {
		const xlsxValue = 'How about...';
		expect(replaceAndEscapeValues(xlsxValue)).toBe('How about...');
	});
});
