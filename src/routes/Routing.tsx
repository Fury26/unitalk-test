import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Operators/OperatorsPage';

const Routing = () => {
	return (
		<Routes>
			<Route path="*" element={<Home />} />
		</Routes>
	);
};

export default Routing;
