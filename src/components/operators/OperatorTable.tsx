import { BooleanFilter, FilterType, TextFilter } from '@/components/filters';
import { Operator } from '@/features/table/types';
import { useSearchParams } from '@/hooks/useSearchParams';
import { formatDate } from '@/utils/formatting';
import {
	Checkbox,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from '@mui/material';
import { useMemo } from 'react';

const TABLE_FILTERS = [
	{ field: 'name', type: FilterType.Text, label: 'Name' },
	{ field: 'isWorking', type: FilterType.Boolean, label: 'Is Working' },
];

type Props = {
	operators: Operator[];
};

const DEFAULT_SORT = 'name:asc';

type SortParam = [string, 'asc' | 'desc'];

const DEFAULT_COLUMNS = [
	{ id: 'name', label: 'Name', sortable: true },
	{ id: 'createdAt', label: 'Created At', sortable: true },
	{ id: 'isWorking', label: 'Is Working', sortable: true },
	{ id: 'customField', label: 'Custom Field', sortable: false },
];

export function OperatorTable({ operators }: Props) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortField, sortOrder] = useMemo(
		() => (searchParams.get('sort') || DEFAULT_SORT).split(':') as SortParam,
		[searchParams],
	);

	return (
		<>
			<Stack direction="row" spacing={4}>
				{TABLE_FILTERS.map((filter) => {
					switch (filter.type) {
						case FilterType.Text:
							return <TextFilter key={filter.field} field={filter.field} label={filter.label} />;
						case FilterType.Boolean:
							return <BooleanFilter key={filter.field} field={filter.field} label={filter.label} />;
						default:
							return null;
					}
				})}
			</Stack>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{DEFAULT_COLUMNS.map((column) => (
								<TableCell key={column.id}>
									{column.sortable ? (
										<TableSortLabel
											active={sortField === column.id}
											direction={sortField === column.id ? sortOrder : undefined}
											onClick={() => {
												setSearchParams(
													'sort',
													`${column.id}:${sortField === column.id ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'}`,
												);
											}}
										>
											{column.label}
										</TableSortLabel>
									) : (
										column.label
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{operators.map((operator) => (
							<TableRow key={operator.id}>
								<TableCell>
									<Checkbox checked={operator.isWorking} />
								</TableCell>
								<TableCell>{operator.name}</TableCell>
								<TableCell>{formatDate(operator.createdAt, true)}</TableCell>
								<TableCell>Todo</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
