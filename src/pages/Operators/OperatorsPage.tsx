import { useAppDispatch, useAppSelector } from '@/app/store';
import { FilterType, SortParam } from '@/components/filters';
import { OperatorTable } from '@/components/operators/OperatorTable';
import { getOperatorsFetch } from '@/features/table/tableSlice';
import { useSearchParams } from '@/hooks/useSearchParams';
import { useUrlDateFilter } from '@/hooks/useUrlDateFilter';
import { Filters } from '@/pages/Operators/Filters';
import { Container, TablePagination } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';

const TABLE_FILTERS = [
	{ field: 'name', type: FilterType.Text, label: 'Name' } as const,
	{ field: 'isWorking', type: FilterType.Boolean, label: 'Is Working' } as const,
	// { field: 'createdAt', type: FilterType.DateRange, label: 'Created At', fromUrl: 'from', toUrl: 'to' } as const,
];
const DEFAULT_SORT = 'name:asc';

const Home = () => {
	const dispacth = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
	// const { fromDayjs, toDayjs } = useUrlDateFilter(TABLE_FILTERS[2].fromUrl, TABLE_FILTERS[2].toUrl);
	const { operators, operatorAddons, loadingOperators } = useAppSelector((state) => state.table);

	const [sortField, sortOrder] = useMemo(
		() => (searchParams.get('sort') || DEFAULT_SORT).split(':') as SortParam,
		[searchParams],
	);

	const { page, limit, name, isWorking } = useMemo(() => {
		const params = new URLSearchParams(searchParams);
		const page = Number(params.get('page') || '1');
		const limit = Number(params.get('limit') || '10');
		const isWorking = params.get('isWorking');
		return { page, limit, name: params.get('name'), isWorking: isWorking === null ? null : isWorking === 'true' };
	}, [searchParams]);

	// const filteredOperators = useMemo(() => {
	// 	const { name, isWorking } = filters;
	// 	const filtered = operators.filter((operator) => {
	// 		if (fromDayjs) {
	// 			if (fromDayjs.isAfter(operator.createdAt, 'day')) {
	// 				return false;
	// 			}
	// 		}
	// 		if (toDayjs) {
	// 			if (toDayjs.isBefore(operator.createdAt, 'day')) {
	// 				return false;
	// 			}
	// 		}
	// 		if (name) {
	// 			if (!operator.name.toLowerCase().includes(name.toLowerCase())) {
	// 				return false;
	// 			}
	// 		}
	// 		if (isWorking) {
	// 			if (operator.isWorking !== isWorking) {
	// 				return false;
	// 			}
	// 		}
	// 		return true;
	// 	});
	// 	return filtered.slice((page - 1) * limit, page * limit).sort((a, b) => {
	// 		const field = sortField as keyof (typeof operators)[0];
	// 		if (sortField === 'createdAt') {
	// 			const isAfter = dayjs(a.createdAt).isAfter(dayjs(b.createdAt));
	// 			return sortOrder === 'asc' ? (isAfter ? 1 : -1) : isAfter ? -1 : 1;
	// 		}
	// 		return sortOrder === 'asc'
	// 			? a[field].toString().localeCompare(b[field].toString())
	// 			: b[field].toString().localeCompare(a[field].toString());
	// 	});
	// }, [operators, page, limit, filters, fromDayjs, toDayjs, sortField, sortOrder]);

	const pagination = useMemo(
		() => (
			<TablePagination
				component="div"
				count={-1}
				page={page - 1}
				onPageChange={(_, page) => setSearchParams('page', (page + 1).toString())}
				rowsPerPage={limit}
				onRowsPerPageChange={(e) => setSearchParams('limit', e.target.value)}
			/>
		),
		[operators.length, page, limit, setSearchParams],
	);

	useEffect(() => {
		dispacth(getOperatorsFetch({ page, limit, sortBy: sortField, order: sortOrder, name, isWorking }));
	}, [page, limit, sortField, sortOrder, name, isWorking]);

	return (
		<Container sx={{ py: 2, position: 'relative' }}>
			<Filters config={TABLE_FILTERS} />
			{pagination}
			<OperatorTable
				isLoading={loadingOperators}
				operators={operators}
				sort={[sortField, sortOrder]}
				onSortChange={(field, order) => setSearchParams('sort', `${field}:${order}`)}
			/>
			{pagination}
		</Container>
	);
};

export default Home;
