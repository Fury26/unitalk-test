import { useAppDispatch, useAppSelector } from '@/app/store';
import { getOperatorsFetch } from '@/features/table/tableSlice';
import { Container } from '@mui/material';
import { useEffect } from 'react';

const Home = () => {
	const { mode } = useAppSelector((state) => state.app);
	const dispacth = useAppDispatch();

	useEffect(() => {
		dispacth(getOperatorsFetch());
	}, []);

	return <Container sx={{ py: 2, position: 'relative' }}>Theme mode: {mode}</Container>;
};

export default Home;
