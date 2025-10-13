import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import windowsReducer from "./slices/windowsSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
    reducer: {
        app: appReducer,
        windows: windowsReducer,
        settings: settingsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
