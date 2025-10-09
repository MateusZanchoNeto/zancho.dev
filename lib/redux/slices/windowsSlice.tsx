import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    position: { x: number; y: number };
    zIndex: number;
}

interface WindowsState {
    windows: WindowState[];
    nextZIndex: number;
}

const initialState: WindowsState = {
    windows: [],
    nextZIndex: 100,
};

const windowsSlice = createSlice({
    name: "windows",
    initialState,
    reducers: {
        openWindow: (
            state,
            action: PayloadAction<{ id: string; title: string }>,
        ) => {
            const { id, title } = action.payload;
            const existingWindow = state.windows.find((w) => w.id === id);

            if (existingWindow) {
                const maxZIndex = state.nextZIndex;
                existingWindow.zIndex = maxZIndex;
                state.nextZIndex = maxZIndex + 1;
            } else {
                const newWindow: WindowState = {
                    id,
                    title,
                    isOpen: true,
                    position: {
                        x: 150 + state.windows.length * 20,
                        y: 100 + state.windows.length * 20,
                    },
                    zIndex: state.nextZIndex,
                };
                state.windows.push(newWindow);
                state.nextZIndex += 1;
            }
        },
        closeWindow: (state, action: PayloadAction<string>) => {
            state.windows = state.windows.filter((w) => w.id !== action.payload);
        },
        focusWindow: (state, action: PayloadAction<string>) => {
            const windowId = action.payload;
            const windowToFocus = state.windows.find((w) => w.id === windowId);

            if (windowToFocus && windowToFocus.zIndex < state.nextZIndex - 1) {
                const newZIndex = state.nextZIndex;
                windowToFocus.zIndex = newZIndex;
                state.nextZIndex = newZIndex + 1;
            }
        },
        updateWindowPosition: (
            state,
            action: PayloadAction<{ id: string; position: { x: number; y: number } }>,
        ) => {
            const { id, position } = action.payload;
            const windowToUpdate = state.windows.find((w) => w.id === id);
            if (windowToUpdate) {
                windowToUpdate.position = position;
            }
        },
    },
});

export const { openWindow, closeWindow, focusWindow, updateWindowPosition } =
    windowsSlice.actions;
export default windowsSlice.reducer;
