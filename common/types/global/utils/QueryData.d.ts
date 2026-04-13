declare type SortOrderTypes = 'asc' | 'desc';

declare interface SortingI<S> {
	sort: S;
	sortDir?: SortOrderTypes;
}
declare interface BasicQuerySearchI {
	search?: string;
	page?: number;
	limit?: number;
}

declare interface DateIntervalQueryI<DATE = number> {
	startDate?: DATE;
	endDate?: DATE;
}

declare interface SortableQuerySearchI<S extends string> extends BasicQuerySearchI, SortingI<S>, DateIntervalQueryI {}

declare interface QuerySearchI<S extends string, AT extends string = string>
	extends SortableQuerySearchI<S>,
		Partial<Record<AT, string | number>> {}
declare interface ListResponse<T extends NonNullable<object>> {
	data: T[];
	total: number;
	page?: number;
	limit?: number;
}
