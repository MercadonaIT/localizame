import type { RawDataType } from '$lib/server/interfaces/raw-data.interface';

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
