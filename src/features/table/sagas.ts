import { mockapi } from "@/app/api/mockapi.io";
import type { Operator, OperatorAddon } from "@/features/table/types";
import type { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

function* fetchOperators(
	params: any = {},
): Generator<any, void, AxiosResponse<Operator[]>> {
	try {
		const response = yield call(() =>
			mockapi.get<Operator[]>("/operator", { params: params.payload }),
		);

		yield put({ type: "table/getOperatorsSuccess", payload: response.data });
	} catch (e) {
		yield put({ type: "table/getOperatorsFailure" });
	}
}

function* fetchOperatorsAddon(): Generator<
	any,
	void,
	AxiosResponse<OperatorAddon[]>
> {
	try {
		const additionalOperatorsResponse = yield call(() =>
			mockapi.get<OperatorAddon[]>("/operatorAddon"),
		);
		yield put({
			type: "table/setOperatorsAddon",
			payload: additionalOperatorsResponse.data,
		});
	} catch (e) {
		yield put({ type: "table/getOperatorsAddonFailure" });
	}
}

function* operatorsSaga() {
	yield takeEvery("table/getOperatorsFetch", fetchOperators);
}

function* operatorsAddonSaga() {
	yield takeEvery("table/getOperatorsAddonFetch", fetchOperatorsAddon);
}

export { operatorsSaga, operatorsAddonSaga };
