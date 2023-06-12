import type { RawDataType } from '../interfaces/raw-data.interface';
import type { LanguageInterface } from '../interfaces/language.interface';

export function getLanguageRow(data: RawDataType): LanguageInterface[] {
	return Object.keys(data).map((key) => ({
		name: key,
		code: data[key]
	}));
}
