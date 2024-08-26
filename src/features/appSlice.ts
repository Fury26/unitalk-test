import type { PaletteMode } from "@mui/material";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
	mode: PaletteMode;
}

// Define the initial state for the slice
const initialState: AppState = {
	mode: "light",
};

// Create the slice
const appSlice = createSlice({
	name: "app",
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
