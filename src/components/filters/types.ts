export enum FilterType {
	Text = 'text',
	Boolean = 'boolean',
}
export type SortParam = [string, 'asc' | 'desc'];

export type FilterConfig = { label: string; field: string; type: FilterType };

export type FiltersConfig = FilterConfig[];
