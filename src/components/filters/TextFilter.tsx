import useDebounce from "@/hooks/useDebounce";
import { useSearchParams } from "@/hooks/useSearchParams";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
	field: string;
	label: string;
};

export const TextFilter = ({ field, label }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [temp, setTemp] = useState(searchParams.get(field) || "");

	const debounced = useDebounce(temp, 1000);

	useEffect(() => {
		setSearchParams(field, debounced);
	}, [debounced, field, setSearchParams]);

	useEffect(() => {
		setTemp(searchParams.get(field) || "");
	}, [searchParams, field]);

	return (
		<TextField
			id="filled-search"
			label={label}
			sx={{ width: 240 }}
			type="search"
			variant="filled"
			value={temp}
			onChange={(e) => setTemp(e.target.value)}
		/>
	);
};
