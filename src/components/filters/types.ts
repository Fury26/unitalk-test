export enum FilterType {
	Text = 'text',
	Boolean = 'boolean',
	DateRange = 'dateRange',
}
export type SortParam = [string, 'asc' | 'desc'];

export type FilterConfig =
	| { label: string; field: string; type: FilterType.Boolean | FilterType.Text }
	| {
			label: string;
			field: string;
			type: FilterType.DateRange;
			fromUrl: string;
			toUrl: string;
	  };

export type FiltersConfig = FilterConfig[];
