export function getSort<S>(sortKeys: S[], sort?: string, direction?: string): SortingI<S> {
	const sortDir = direction === 'asc' ? 'asc' : 'desc';
	return {
		sort: sortKeys.includes(sort as S) ? (sort as S) : sortKeys[0],
		sortDir,
	};
}
