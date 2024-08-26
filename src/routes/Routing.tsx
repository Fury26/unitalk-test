import Home from "@/pages/Operators/OperatorsPage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
	return (
		<Routes>
			<Route path="*" element={<Home />} />
		</Routes>
	);
};

export default Routing;
