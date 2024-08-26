import type { RootState } from "@/app/store";
import type { Operator, OperatorAddon } from "@/features/table/types";
import {
	type PayloadAction,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";

interface TableState {
	operators: Operator[];
	operatorAddons: OperatorAddon[];
	loadingOperators: boolean;
	loadingOperatorsAddon: boolean;
}

// Define the initial state for the slice
const initialState: TableState = {
	operators: [],
	operatorAddons: [],
	loadingOperators: false,
	loadingOperatorsAddon: false,
};

// Create the slice
const tableSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		getOperatorsFetch: (state, _props) => {
			state.loadingOperators = true;
		},
		getOperatorsSuccess: (state, action: PayloadAction<Operator[]>) => {
			state.operators = action.payload;
			state.loadingOperators = false;
		},
		setOperatorsAddon: (state, action: PayloadAction<OperatorAddon[]>) => {
			state.operatorAddons = action.payload;
			state.loadingOperatorsAddon = false;
		},
		getOperatorsFailure: (state) => {
			state.loadingOperators = false;
		},
		getOperatorsAddonFetch: (state) => {
			state.loadingOperatorsAddon = true;
		},
		getOperatorsAddonFailure: (state) => {
			state.loadingOperatorsAddon = false;
		},
	},
});

// Extract the reducer function from the slice
export const tableReducer = tableSlice.reducer;

// Extract action creators from the slice
export const {
	getOperatorsFailure,
	getOperatorsFetch,
	getOperatorsSuccess,
	setOperatorsAddon,
	getOperatorsAddonFetch,
	getOperatorsAddonFailure,
} = tableSlice.actions;

const selectTable = (state: RootState) => state.table;
export const selectOperators = createSelector(
	selectTable,
	(state) => state.operators,
);
export const selectAddons = createSelector(
	selectTable,
	(state) => state.operatorAddons,
);
export const selectLoadingOperators = createSelector(
	selectTable,
	(state) => state.loadingOperators,
);
export const selectLoadingOperatorsAddon = createSelector(
	selectTable,
	(state) => state.loadingOperatorsAddon,
);
