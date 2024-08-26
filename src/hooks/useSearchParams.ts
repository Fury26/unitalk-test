import { useCallback } from "react";
import { useSearchParams as hook } from "react-router-dom";

export const useSearchParams = () => {
	const [searchParams, setSearchParams] = hook();

	const setParam = useCallback(
		(key: string, value?: string | number | null) => {
			setSearchParams((prev) => {
				const temp = new URLSearchParams(prev);
				value || typeof value === "number"
					? temp.set(key, value.toString())
					: temp.delete(key);
				return temp;
			});
		},
		[setSearchParams],
	);

	return [searchParams, setParam] as const;
};
