import OperatorsPage from "@/pages/Operators/OperatorsPage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
	return (
		<Routes>
			<Route path="*" element={<OperatorsPage />} />
		</Routes>
	);
};

export default Routing;
