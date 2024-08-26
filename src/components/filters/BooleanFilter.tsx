import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "@/hooks/useSearchParams";
import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const options = [
	{
		value: "true",
		label: "True",
	},
	{
		value: "false",
		label: "False",
	},
	{
		value: "any",
		label: "Any",
	},
];

type Props = {
	field: string;
	label: string;
};

export const BooleanFilter = ({ field, label }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [temp, setTemp] = useState<string | null>(
		searchParams.get(field) || "any",
	);

	const debounced = useDebounce(temp, 1000);

	useEffect(() => {
		setSearchParams(field, debounced === "any" ? null : debounced);
	}, [debounced, field, setSearchParams]);

	useEffect(() => {
		setTemp(searchParams.get(field) || "any");
	}, [searchParams, field]);

	return (
		<TextField
			id="outlined-select-currency-native"
			select
			sx={{ width: 240 }}
			value={temp}
			onChange={(e) => setTemp(e.target.value)}
			label={label}
		>
			{options.map((option) => (
				<MenuItem
					key={option.value}
					value={option.value}
					onChange={() => setTemp(option.value)}
				>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
};
