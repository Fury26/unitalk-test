import { useAppDispatch, useAppSelector } from '@/app/store';
import { FilterType, SortParam } from '@/components/filters';
import { OperatorTable } from '@/components/operators/OperatorTable';
import { getOperatorsAddonFetch, getOperatorsFetch } from '@/features/table/tableSlice';
import { useSearchParams } from '@/hooks/useSearchParams';
import { Filters } from '@/pages/Operators/Filters';
import { Container, TablePagination } from '@mui/material';
import { useEffect, useMemo } from 'react';

const TABLE_FILTERS = [
	{ field: 'name', type: FilterType.Text, label: 'Name' },
	{ field: 'isWorking', type: FilterType.Boolean, label: 'Is Working' },
];
const DEFAULT_SORT = 'name:asc';

const Home = () => {
	const dispacth = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
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
	}, [dispacth, page, limit, sortField, sortOrder, name, isWorking]);

	useEffect(() => {
		dispacth(getOperatorsAddonFetch());
	}, [dispacth]);

	return (
		<Container sx={{ py: 2, position: 'relative' }}>
			<Filters config={TABLE_FILTERS} />
			{pagination}
			<OperatorTable
				isLoading={loadingOperators}
				addon={operatorAddons}
				operators={operators}
				sort={[sortField, sortOrder]}
				onSortChange={(field, order) => setSearchParams('sort', `${field}:${order}`)}
			/>
			{pagination}
		</Container>
	);
};

export default Home;
