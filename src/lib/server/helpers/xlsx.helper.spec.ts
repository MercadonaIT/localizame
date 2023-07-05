import { describe, expect, it } from 'vitest';
import { getLanguageRow, isSheetFile } from './xlsx.helper';

describe('Is sheet file checker', () => {
	it('should allow sheet files', () => {
		const areValid = [
			isSheetFile('application/excel'),
			isSheetFile('application/vnd.ms-excel'),
			isSheetFile('application/x-excel'),
			isSheetFile('application/x-msexcel'),
			isSheetFile('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
		];
		expect(areValid.every((check) => check)).toBe(true);
	});

	it('should disallow invalid files', () => {
		const isValid = isSheetFile('application/pdf');
		expect(isValid).toBe(false);
	});
});

describe('Get language list from XLSX', () => {
	it('should get 3 languages', () => {
		const xlsx = { English: 'en', Spanish: 'es', Portuguese: 'pt' };
		expect(getLanguageRow(xlsx)).toEqual([
			{ name: 'English', code: 'en' },
			{ name: 'Spanish', code: 'es' },
			{ name: 'Portuguese', code: 'pt' }
		]);
	});

	it('should get 1 language', () => {
		const xlsx = { English: 'en' };
		expect(getLanguageRow(xlsx)).toEqual([{ name: 'English', code: 'en' }]);
	});
});
