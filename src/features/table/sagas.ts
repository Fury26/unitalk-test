import { mockapi } from '@/app/api/mockapi.io';
import { Operator, OperatorAddon } from '@/features/table/types';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchOperators(): Generator<any, void, AxiosResponse<Operator[]>> {
	try {
		const response = yield call(() =>
			mockapi.get<Operator[]>('/operator', { params: { sortBy: 'createdAt', order: 'desc' } }),
		);
		const operators = response.data;
		console.log('response', response);

		const additionalOperatorsResponse = yield call(() => mockapi.get<OperatorAddon[]>('/operatorAddon'));

		yield put({ type: 'table/getOperatorsSuccess', payload: operators });
		yield put({ type: 'table/setOperatorsAddon', payload: additionalOperatorsResponse.data });
	} catch (e) {
		yield put({ type: 'table/getOperatorsFailure', payload: e });
	}
}

function* operatorsSaga() {
	yield takeEvery('table/getOperatorsFetch', fetchOperators);
}

export { operatorsSaga };
