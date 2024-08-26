import { useAppDispatch, useAppSelector } from "@/app/store";
import { FilterType } from "@/components/filters";
import { OperatorTable } from "@/components/operators/OperatorTable";
import {
	getOperatorsAddonFetch,
	getOperatorsFetch,
} from "@/features/table/tableSlice";
import { Filters } from "@/pages/Operators/Filters";
import { OperatorsTablePagination } from "@/pages/Operators/OperatorsTablePagination";
import { useOperatorsSearchParams } from "@/pages/Operators/useOperatorsSearchParams";

import { Container } from "@mui/material";
import { useEffect } from "react";

const TABLE_FILTERS = [
	{ field: "name", type: FilterType.Text, label: "Name" },
	{ field: "isWorking", type: FilterType.Boolean, label: "Is Working" },
];

const OperatorsPage = () => {
	const dispacth = useAppDispatch();

	const { operators, operatorAddons, loadingOperators } = useAppSelector(
		(state) => state.table,
	);

	const { page, limit, name, isWorking, sortField, sortOrder, setSortParams } =
		useOperatorsSearchParams();

	useEffect(() => {
		console.log("fetching operators");

		dispacth(
			getOperatorsFetch({
				page,
				limit,
				sortBy: sortField,
				order: sortOrder,
				name,
				isWorking,
			}),
		);
	}, [dispacth, page, limit, sortField, sortOrder, name, isWorking]);

	useEffect(() => {
		dispacth(getOperatorsAddonFetch());
	}, [dispacth]);

	return (
		<Container sx={{ py: 2, position: "relative" }}>
			<Filters config={TABLE_FILTERS} />
			<OperatorsTablePagination />
			<OperatorTable
				isLoading={loadingOperators}
				addon={operatorAddons}
				operators={operators}
				sort={[sortField, sortOrder]}
				onSortChange={setSortParams}
			/>
			<OperatorsTablePagination />
		</Container>
	);
};

export default OperatorsPage;
