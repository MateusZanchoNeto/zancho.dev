import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    theme: "default" | "matrix";
    desktopBackground: {
        type: "image" | "color";
        value: string;
        blur: boolean;
    };
    window: {
        opacity: number;
        blur: boolean;
        rounded: boolean;
    };
    windowControls: {
        buttonSize: "sm" | "md" | "lg";
        buttonStyle: "circle" | "square" | "rounded";
        titleBarColor: "dark" | "light" | "gradient";
    };
}

const initialState: SettingsState = {
    theme: "default",
    desktopBackground: {
        type: "image",
        value: 'url("/mountains-bg.jpg")',
        blur: true,
    },
    window: {
        opacity: 80,
        blur: true,
        rounded: true,
    },
    windowControls: {
        buttonSize: "md",
        buttonStyle: "circle",
        titleBarColor: "gradient",
    },
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<"default" | "matrix">) => {
            state.theme = action.payload;
            if (action.payload === "matrix") {
                state.desktopBackground = {
                    type: "image",
                    value: 'url("/matrix-bg.gif")',
                    blur: true,
                };
            } else {
                state.desktopBackground = {
                    type: "image",
                    value: 'url("/mountains-bg.jpg")',
                    blur: true,
                };
            }
        },
        setDesktopBackground: (
            state,
            action: PayloadAction<{ type: "image" | "color"; value: string }>,
        ) => {
            state.desktopBackground.type = action.payload.type;
            state.desktopBackground.value = action.payload.value;
        },
        toggleDesktopBlur: (state) => {
            state.desktopBackground.blur = !state.desktopBackground.blur;
        },
        setWindowOpacity: (state, action: PayloadAction<number>) => {
            state.window.opacity = action.payload;
        },
        toggleWindowBlur: (state) => {
            state.window.blur = !state.window.blur;
        },
        toggleWindowRounded: (state) => {
            state.window.rounded = !state.window.rounded;
        },
        setControlButtonSize: (
            state,
            action: PayloadAction<"sm" | "md" | "lg">,
        ) => {
            state.windowControls.buttonSize = action.payload;
        },
        setControlButtonStyle: (
            state,
            action: PayloadAction<"circle" | "square" | "rounded">,
        ) => {
            state.windowControls.buttonStyle = action.payload;
        },
        setTitleBarColor: (
            state,
            action: PayloadAction<"dark" | "light" | "gradient">,
        ) => {
            state.windowControls.titleBarColor = action.payload;
        },
    },
});

export const {
    setTheme,
    setDesktopBackground,
    setWindowOpacity,
    toggleWindowBlur,
    toggleWindowRounded,
    setControlButtonSize,
    setControlButtonStyle,
    setTitleBarColor,
    toggleDesktopBlur,
} = settingsSlice.actions;

export default settingsSlice.reducer;
