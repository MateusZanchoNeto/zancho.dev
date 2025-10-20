import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WindowRestoreState {
    position: { x: number; y: number };
    size: { width: number; height: number };
}

export interface WindowState {
    id: string;
    title: string;
    isOpen: boolean;
    position: { x: number; y: number };
    zIndex: number;
    size: { width: number; height: number };
    isFullscreen: boolean;
    previousState?: WindowRestoreState;
}

interface WindowsState {
    windows: WindowState[];
    nextZIndex: number;
}

const initialState: WindowsState = {
    windows: [],
    nextZIndex: 100,
};

interface OpenWindowPayload {
    id: string;
    title: string;
    size?: { width: number; height: number };
    isMobile: boolean;
}

const windowsSlice = createSlice({
    name: "windows",
    initialState,
    reducers: {
        openWindow: (state, action: PayloadAction<OpenWindowPayload>) => {
            const { id, title, size, isMobile } = action.payload;
            const existingWindow = state.windows.find((w) => w.id === id);

            const newPosition = {
                x: 150 + state.windows.length * 20,
                y: 100 + state.windows.length * 20,
            };

            console.log(isMobile);
            if (isMobile) {
                newPosition.x = 0;
                newPosition.y = 0;
            }
            console.log(newPosition);

            if (existingWindow) {
                const maxZIndex = state.nextZIndex;
                existingWindow.zIndex = maxZIndex;
                state.nextZIndex = maxZIndex + 1;
            } else {
                const newWindow: WindowState = {
                    id,
                    title,
                    isOpen: true,
                    position: newPosition,
                    zIndex: state.nextZIndex,
                    size: size || { width: 420, height: 250 },
                    isFullscreen: false,
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
        toggleFullscreen: (state, action: PayloadAction<string>) => {
            const windowId = action.payload;
            const window = state.windows.find((w) => w.id === windowId);

            if (window) {
                if (window.isFullscreen) {
                    if (window.previousState) {
                        window.position = window.previousState.position;
                        window.size = window.previousState.size;
                        window.previousState = undefined;
                    }
                    window.isFullscreen = false;
                } else {
                    window.previousState = {
                        position: window.position,
                        size: window.size,
                    };
                    window.position = { x: 0, y: 0 };
                    window.isFullscreen = true;
                }
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

export const {
    openWindow,
    closeWindow,
    focusWindow,
    updateWindowPosition,
    toggleFullscreen,
} = windowsSlice.actions;
export default windowsSlice.reducer;
