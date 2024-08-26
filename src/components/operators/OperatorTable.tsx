import type { Operator, OperatorAddon } from "@/features/table/types";
import { formatDate } from "@/utils/formatting";
import {
	Avatar,
	Button,
	Checkbox,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {
	operators: Operator[];
	addon: OperatorAddon[];
	onSortChange: (sortField: string, sortOrder: "asc" | "desc") => void;
	sort: [string, "asc" | "desc"];
	isLoading: boolean;
};

const DEFAULT_COLUMNS = [
	{ id: "avatar", label: "", sortable: false },
	{
		id: "isWorking",
		label: "Is Working",
		sortable: true,
	},
	{ id: "name", label: "Name", sortable: true },
	{ id: "createdAt", label: "Created At", sortable: false },
	{ id: "customField", label: "Custom Field", sortable: false },
];

export function OperatorTable({
	operators,
	onSortChange,
	sort,
	isLoading,
	addon,
}: Props) {
	const [, setSearchParams] = useSearchParams();
	const [sortField, sortOrder] = sort;

	if (isLoading && !operators.length) {
		return <Stack>Loading...</Stack>;
	}

	if (!operators.length && !isLoading) {
		return (
			<Stack
				direction="column"
				justifyItems="center"
				alignItems="center"
				sx={{ height: 300 }}
				gap={2}
			>
				No operators found!
				<Button variant="contained" onClick={() => setSearchParams({})}>
					Clear Filters
				</Button>
			</Stack>
		);
	}

	return (
		<>
			<TableContainer sx={{ opacity: isLoading ? 0.7 : 1 }}>
				<Table>
					<TableHead>
						<TableRow>
							{DEFAULT_COLUMNS.map((column) => (
								<TableCell key={column.id}>
									{column.sortable ? (
										<TableSortLabel
											active={sortField === column.id}
											direction={
												sortField === column.id ? sortOrder : undefined
											}
											onClick={() =>
												onSortChange(
													column.id,
													sortField === column.id
														? sortOrder === "asc"
															? "desc"
															: "asc"
														: "asc",
												)
											}
										>
											{column.label}
										</TableSortLabel>
									) : (
										column.label
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{operators.map((operator) => (
							<TableRow key={operator.id}>
								<TableCell>
									<Avatar src={operator.avatar} alt={operator.name} />
								</TableCell>
								<TableCell>
									<Checkbox disabled checked={operator.isWorking} />
								</TableCell>
								<TableCell>{operator.name}</TableCell>
								<TableCell>{formatDate(operator.createdAt, true)}</TableCell>
								<TableCell>
									{addon.find(({ id }) => id === operator.id)?.text ||
										"Not found"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
