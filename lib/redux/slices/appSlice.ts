import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AppStatus = "BOOTING" | "LOGIN" | "DESKTOP";
type UserRole = "OWNER" | "VISITOR" | null;

interface AppState {
    status: AppStatus;
    userRole: UserRole;
    authError: string | null;
    isAuthenticating: boolean;
}

const initialState: AppState = {
    status: "BOOTING",
    userRole: null,
    authError: null,
    isAuthenticating: false,
};

export const verifyOwnerPassword = createAsyncThunk(
    "app/verifyOwnerPassword",
    async (password: string, { rejectWithValue }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (password === process.env.NEXT_PUBLIC_OWNER_PASSWORD) {
            return "OWNER";
        } else {
            return rejectWithValue("Access Denied: Incorrect Password");
        }
    },
);

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        finishBooting: (state) => {
            state.status = "LOGIN";
        },
        loginAsVisitor: (state) => {
            state.status = "DESKTOP";
            state.userRole = "VISITOR";
        },
        logout: (state) => {
            state.status = "LOGIN";
            state.userRole = null;
        },
        rebootSystem: (state) => {
            state.status = "BOOTING";
            state.userRole = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(verifyOwnerPassword.pending, (state) => {
                state.isAuthenticating = true;
                state.authError = null;
            })
            .addCase(verifyOwnerPassword.fulfilled, (state, action) => {
                state.isAuthenticating = false;
                state.status = "DESKTOP";
                state.userRole = action.payload as UserRole;
            })
            .addCase(verifyOwnerPassword.rejected, (state, action) => {
                state.isAuthenticating = false;
                state.authError = action.payload as string;
            });
    },
});

export const { finishBooting, loginAsVisitor, logout, rebootSystem } =
    appSlice.actions;
export default appSlice.reducer;
