import {
	booleanParam,
	enumParam,
	limitParam,
	orderParam,
	pageParam,
} from "@/utils/params";
import { useSearchParams } from "react-router-dom";

type SortType = Zod.infer<typeof orderParam>;

export const useOperatorsSearchParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const page = pageParam.parse(params.get("page"));
	const limit = limitParam.parse(params.get("limit"));
	const isWorking = booleanParam.parse(params.get("isWorking"));
	const sort = (searchParams.get("sort") || "").split(":");
	const sortOrder = orderParam.parse(sort[1]);

	return {
		page,
		limit,
		sortOrder,
		sortField: enumParam(["name", "isWorking"]).parse(sort[0]),
		name: params.get("name"),
		isWorking: isWorking === null ? null : isWorking === "true",
		setPageParams: (page: number) => {
			searchParams.set("page", page.toString());
			setSearchParams(searchParams);
		},
		setLimitParams: (limit: number) => {
			searchParams.set("limit", limit.toString());
			searchParams.set("page", "1");
			setSearchParams(searchParams);
		},
		setSortParams: (sortField: string, sortOrder: SortType) => {
			searchParams.set("sort", `${sortField}:${sortOrder}`);
			setSearchParams(searchParams);
		},
	};
};
