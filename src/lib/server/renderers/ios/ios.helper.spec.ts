import { describe, expect, it } from 'vitest';
import { escapeString, getIosGroupedLiteralList, getLanguageLiteralList } from './ios.helper';

describe('Get iOS literal list', () => {
	it('should get es literals', () => {
		const language = { name: 'Spanish', code: 'es' };
		const xlsx = [
			{ key: 'stopped', Spanish: 'parado', English: 'stopped' },
			{ key: 'poison', Spanish: 'veneno', English: 'poison' }
		];
		const literals = getLanguageLiteralList(language, xlsx);
		expect(literals).toEqual([
			{ key: 'stopped', value: 'parado' },
			{ key: 'poison', value: 'veneno' }
		]);
	});

	it('should get en literals', () => {
		const language = { name: 'English', code: 'en' };
		const xlsx = [
			{ key: 'stopped', Spanish: 'parado', English: 'stopped' },
			{ key: 'poison', Spanish: 'veneno', English: 'poison' }
		];
		const literals = getLanguageLiteralList(language, xlsx);
		expect(literals).toEqual([
			{ key: 'stopped', value: 'stopped' },
			{ key: 'poison', value: 'poison' }
		]);
	});
});

describe('Escape iOS strings', () => {
	it('should always use same single quotes and escape them', () => {
		const xlsxValue = 'Hello, what a `beautiful` day, don´t you think?';
		expect(escapeString(xlsxValue)).toBe(`Hello, what a \\'beautiful\\' day, don\\'t you think?`);
	});

	it('should always use same double quotes and escape them', () => {
		const xlsxValue = 'Hello, what a ”beautiful” day, don”t you think?';
		expect(escapeString(xlsxValue)).toBe(`Hello, what a \\"beautiful\\" day, don\\"t you think?`);
	});
});

describe('Get iOS key list by group', () => {
	it('should group all literal keys by group', () => {
		const xlsxValue = [
			{ key: 'common_hello', Spanish: 'hola' },
			{ key: 'common_people', Spanish: 'gente' },
			{ key: 'actions_delete', Spanish: 'eliminar' },
			{ key: 'actions_create', Spanish: 'crear' },
			{ key: 'actions_move', Spanish: 'mover' },
			{ key: 'common_accept', Spanish: 'aceptar' },
			{ key: 'common_cancel', Spanish: 'cancelar' }
		];
		const groups = getIosGroupedLiteralList(xlsxValue);

		expect(groups).toEqual([
			{
				name: 'common',
				literals: [
					{ group: 'hello', value: 'common_hello' },
					{ group: 'people', value: 'common_people' },
					{ group: 'accept', value: 'common_accept' },
					{ group: 'cancel', value: 'common_cancel' }
				]
			},
			{
				name: 'actions',
				literals: [
					{ group: 'delete', value: 'actions_delete' },
					{ group: 'create', value: 'actions_create' },
					{ group: 'move', value: 'actions_move' }
				]
			}
		]);
	});
});
