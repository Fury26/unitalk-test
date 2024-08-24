import { useAppDispatch, useAppSelector } from '@/app/store';
import { OperatorTable } from '@/components/operators/OperatorTable';
import { getOperatorsFetch } from '@/features/table/tableSlice';
import { Container } from '@mui/material';
import { useEffect } from 'react';

const Home = () => {
	const { mode } = useAppSelector((state) => state.app);
	const { operators } = useAppSelector((state) => state.table);
	const dispacth = useAppDispatch();

	useEffect(() => {
		dispacth(getOperatorsFetch());
	}, []);

	return (
		<Container sx={{ py: 2, position: 'relative' }}>
			<OperatorTable operators={operators} />
		</Container>
	);
};

export default Home;
