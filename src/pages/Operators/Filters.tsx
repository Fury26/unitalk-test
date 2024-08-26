import {
	BooleanFilter,
	FilterType,
	type FiltersConfig,
	TextFilter,
} from "@/components/filters";
import { Stack } from "@mui/material";

type Props = {
	config: FiltersConfig;
};

export const Filters = ({ config }: Props) => {
	return (
		<Stack direction="row" spacing={4}>
			{config.map((filter) => {
				switch (filter.type) {
					case FilterType.Text:
						return (
							<TextFilter
								key={filter.field}
								field={filter.field}
								label={filter.label}
							/>
						);
					case FilterType.Boolean:
						return (
							<BooleanFilter
								key={filter.field}
								field={filter.field}
								label={filter.label}
							/>
						);
					default:
						return null;
				}
			})}
		</Stack>
	);
};
