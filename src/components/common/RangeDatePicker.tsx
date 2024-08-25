import dayjs, { Dayjs } from 'dayjs';

import { Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DATE_FORMAT } from '@/utils/formatting';

type Props = {
	from?: Dayjs | null;
	to?: Dayjs | null;
	onChange: (from?: Dayjs | null, to?: Dayjs | null) => void;
	disableFuture?: boolean;
};

export const RangeDatePicker = ({ from, to, onChange, disableFuture = true }: Props) => {
	return (
		<Stack direction="row" spacing={2}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					closeOnSelect={true}
					label="From"
					value={from}
					disableFuture={disableFuture}
					slotProps={{
						field: {
							clearable: true,
						},
					}}
					maxDate={to || undefined}
					format={DATE_FORMAT}
					onChange={(newValue) => onChange(newValue ? dayjs(newValue) : null, to)}
				/>
			</LocalizationProvider>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					label="To"
					closeOnSelect={true}
					value={to}
					minDate={from || undefined}
					disableFuture={disableFuture}
					format={DATE_FORMAT}
					slotProps={{
						field: {
							clearable: true,
						},
					}}
					onChange={(newValue) => onChange(from, newValue ? dayjs(newValue) : null)}
				/>
			</LocalizationProvider>
		</Stack>
	);
};
