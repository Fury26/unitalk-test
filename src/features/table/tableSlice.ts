import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operator, OperatorAddon } from '@/features/table/types';

interface TableState {
	operators: Operator[];
	operatorAddons: OperatorAddon[];
	loadingOperators: boolean;
}

// Define the initial state for the slice
const initialState: TableState = {
	operators: [],
	operatorAddons: [],
	loadingOperators: false,
};

// Create the slice
const tableSlice = createSlice({
	name: 'table',
	initialState,
	reducers: {
		getOperatorsFetch: (state, props) => {
			state.loadingOperators = true;
		},
		getOperatorsSuccess: (state, action: PayloadAction<Operator[]>) => {
			state.operators = action.payload;
			state.loadingOperators = false;
		},
		setOperatorsAddon: (state, action: PayloadAction<OperatorAddon[]>) => {
			state.operatorAddons = action.payload;
		},
		getOperatorsFailure: (state) => {
			state.loadingOperators = false;
		},
	},
});

// Extract the reducer function from the slice
export const tableReducer = tableSlice.reducer;

// Extract action creators from the slice
export const { getOperatorsFailure, getOperatorsFetch, getOperatorsSuccess, setOperatorsAddon } = tableSlice.actions;
