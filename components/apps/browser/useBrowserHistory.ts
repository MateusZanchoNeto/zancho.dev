import { useReducer, useCallback } from "react";

interface BrowserState {
    history: string[];
    currentIndex: number;
}

type BrowserAction =
    | { type: "NAVIGATE"; payload: string }
    | { type: "BACK" }
    | { type: "FORWARD" };

const initialUrl = "https://www.google.com/webhp?igu=1";

const initialState: BrowserState = {
    history: [initialUrl],
    currentIndex: 0,
};

function browserReducer(
    state: BrowserState,
    action: BrowserAction,
): BrowserState {
    switch (action.type) {
        case "NAVIGATE":
            const newHistory = state.history.slice(0, state.currentIndex + 1);
            newHistory.push(action.payload);
            return {
                history: newHistory,
                currentIndex: newHistory.length - 1,
            };
        case "BACK":
            return { ...state, currentIndex: Math.max(0, state.currentIndex - 1) };
        case "FORWARD":
            return {
                ...state,
                currentIndex: Math.min(
                    state.history.length - 1,
                    state.currentIndex + 1,
                ),
            };
        default:
            return state;
    }
}

export function useBrowserHistory() {
    const [state, dispatch] = useReducer(browserReducer, initialState);

    const navigate = useCallback((url: string) => {
        let fullUrl = url.trim();
        if (!/^https?:\/\//i.test(fullUrl)) {
            fullUrl = "https://" + fullUrl;
        }
        dispatch({ type: "NAVIGATE", payload: fullUrl });
    }, []);

    const back = () => dispatch({ type: "BACK" });
    const forward = () => dispatch({ type: "FORWARD" });

    return {
        currentUrl: state.history[state.currentIndex],
        back,
        forward,
        navigate,
        canGoBack: state.currentIndex > 0,
        canGoForward: state.currentIndex < state.history.length - 1,
    };
}
