import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

interface AppState {
	mode: PaletteMode;
}

// Define the initial state for the slice
const initialState: AppState = {
	mode: 'light',
};

// Create the slice
const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setMode: (state, action: PayloadAction<PaletteMode>) => {
			state.mode = action.payload;
		},
	},
});

// Extract the reducer function from the slice
export const appReducer = appSlice.reducer;

// Extract action creators from the slice
export const { setMode } = appSlice.actions;
