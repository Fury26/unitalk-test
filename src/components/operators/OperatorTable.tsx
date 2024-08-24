import { Operator } from '@/features/table/types';
import { formatDate } from '@/utils/formatting';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type Props = {
	operators: Operator[];
};

export function OperatorTable({ operators }: Props) {
	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Is working</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Created At</TableCell>
						<TableCell>Custom Field</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{operators.map((operator) => (
						<TableRow key={operator.id}>
							<TableCell>
								<Checkbox checked={operator.isWorking} />
							</TableCell>
							<TableCell>{operator.name}</TableCell>
							<TableCell>{formatDate(operator.createdAt, true)}</TableCell>
							<TableCell>Todo</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
