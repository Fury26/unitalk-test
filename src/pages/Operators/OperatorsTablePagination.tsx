import { useOperatorsSearchParams } from "@/pages/Operators/useOperatorsSearchParams";
import { TablePagination } from "@mui/material";

export const OperatorsTablePagination = () => {
	const { page, limit, setPageParams, setLimitParams } =
		useOperatorsSearchParams();

	return (
		<TablePagination
			component="div"
			count={-1}
			page={page - 1}
			onPageChange={(_, page) => setPageParams(page + 1)}
			rowsPerPage={limit}
			onRowsPerPageChange={(e) => setLimitParams(+e.target.value)}
		/>
	);
};
