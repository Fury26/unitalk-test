import { mockapi } from '@/app/api/mockapi.io';
import { Operator, OperatorAddon } from '@/features/table/types';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchOperators(params: any = {}): Generator<any, void, AxiosResponse<Operator[]>> {
	try {
		const response = yield call(() => mockapi.get<Operator[]>('/operator', { params: params.payload }));
		const operators = response.data;
		const additionalOperatorsResponse = yield call(() => mockapi.get<OperatorAddon[]>('/operatorAddon'));

		yield put({ type: 'table/getOperatorsSuccess', payload: operators });
		yield put({ type: 'table/setOperatorsAddon', payload: additionalOperatorsResponse.data });
	} catch (e) {
		yield put({ type: 'table/getOperatorsFailure' });
	}
}

function* operatorsSaga() {
	yield takeEvery('table/getOperatorsFetch', fetchOperators);
}

export { operatorsSaga };
