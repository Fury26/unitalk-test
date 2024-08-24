import { useAppSelector } from '@/app/store';
import { Container } from '@mui/material';

const Home = () => {
	const { mode } = useAppSelector((state) => state.app);
	return <Container sx={{ py: 2, position: 'relative' }}>Theme mode: {mode}</Container>;
};

export default Home;
