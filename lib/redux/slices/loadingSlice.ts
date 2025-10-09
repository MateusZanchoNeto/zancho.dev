import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoadingState {
    isBooting: boolean;
}

const initialState: LoadingState = {
    isBooting: true,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setBootingState: (state, action: PayloadAction<boolean>) => {
            state.isBooting = action.payload;
        },
    },
});

export const { setBootingState } = loadingSlice.actions;

export default loadingSlice.reducer;
