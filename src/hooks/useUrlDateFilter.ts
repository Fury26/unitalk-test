import dayjs, { type Dayjs } from "dayjs";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const URL_DATE_FORMAT = "YYYY-MM-DD";

export const useUrlDateFilter = (fromUrl = "from", toUrl = "to") => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { fromDayjs, toDayjs } = useMemo(() => {
		const searchFrom = searchParams.get(fromUrl);
		const searchTo = searchParams.get(toUrl);

		const fromValue = searchFrom ? dayjs(searchFrom, URL_DATE_FORMAT) : null;
		const toValue = searchTo ? dayjs(searchTo, URL_DATE_FORMAT) : null;

		return { fromDayjs: fromValue, toDayjs: toValue };
	}, [searchParams, fromUrl, toUrl]);

	const onChange = useCallback(
		(newFrom?: Dayjs | null, newTo?: Dayjs | null) => {
			const prev = new URLSearchParams(searchParams);
			newFrom
				? prev.set(fromUrl, newFrom.format(URL_DATE_FORMAT))
				: prev.delete(fromUrl);
			newTo
				? prev.set(toUrl, newTo.format(URL_DATE_FORMAT))
				: prev.delete(toUrl);
			setSearchParams(prev);
		},
		[searchParams, setSearchParams, fromUrl, toUrl],
	);

	const { from, to } = useMemo(
		() => ({
			from: fromDayjs ? dayjs(fromDayjs).format(URL_DATE_FORMAT) : undefined,
			to: toDayjs ? dayjs(toDayjs).format(URL_DATE_FORMAT) : undefined,
		}),
		[fromDayjs, toDayjs],
	);

	return { fromDayjs, toDayjs, onChange, from, to };
};
