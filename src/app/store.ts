import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { appReducer } from '@/features/appSlice';
import createSagaMiddleware from 'redux-saga';
import { operatorsAddonSaga, operatorsSaga } from '@/features/table/sagas';
import { tableReducer } from '@/features/table/tableSlice';

const saga = createSagaMiddleware();

const store = configureStore({
	reducer: {
		app: appReducer,
		table: tableReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga),
});

saga.run(operatorsSaga);
saga.run(operatorsAddonSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
