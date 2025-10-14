import { useReducer } from "react";

interface CalculatorState {
    currentOperand: string;
    previousOperand: string | null;
    operation: string | null;
    overwrite: boolean;
}

type Action =
    | { type: "ADD_DIGIT"; payload: string }
    | { type: "CHOOSE_OPERATION"; payload: string }
    | { type: "APPLY_FUNCTION"; payload: (num: number) => number }
    | { type: "CLEAR" }
    | { type: "EVALUATE" };

const initialState: CalculatorState = {
    currentOperand: "0",
    previousOperand: null,
    operation: null,
    overwrite: false,
};

function evaluate({
    currentOperand,
    previousOperand,
    operation,
}: CalculatorState): string {
    const prev = parseFloat(previousOperand!);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";

    let computation = 0;
    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "×":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
    }
    return computation.toString();
}

function reducer(state: CalculatorState, action: Action): CalculatorState {
    switch (action.type) {
        case "ADD_DIGIT":
            if (state.overwrite)
                return { ...state, currentOperand: action.payload, overwrite: false };
            if (action.payload === "0" && state.currentOperand === "0") return state;
            if (action.payload === "." && state.currentOperand.includes("."))
                return state;
            return {
                ...state,
                currentOperand: `${state.currentOperand === "0" && action.payload !== "." ? "" : state.currentOperand}${action.payload}`,
            };

        case "CHOOSE_OPERATION":
            if (state.currentOperand === "0" && state.previousOperand === null)
                return state;
            if (state.previousOperand === null) {
                return {
                    ...state,
                    operation: action.payload,
                    previousOperand: state.currentOperand,
                    currentOperand: "0",
                };
            }
            return {
                ...state,
                previousOperand: evaluate(state),
                operation: action.payload,
                currentOperand: "0",
            };

        case "EVALUATE":
            if (!state.operation || !state.previousOperand) return state;
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            };

        case "APPLY_FUNCTION":
            const currentVal = parseFloat(state.currentOperand);
            const result = action.payload(currentVal);
            return {
                ...state,
                overwrite: true,
                currentOperand: String(parseFloat(result.toFixed(10))),
            };

        case "CLEAR":
            return initialState;

        default:
            return state;
    }
}

export function useCalculator() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addDigit = (digit: string) =>
        dispatch({ type: "ADD_DIGIT", payload: digit });
    const chooseOperation = (op: string) =>
        dispatch({ type: "CHOOSE_OPERATION", payload: op });
    const clear = () => dispatch({ type: "CLEAR" });
    const evaluateResult = () => dispatch({ type: "EVALUATE" });
    const applyFunction = (fn: (num: number) => number) =>
        dispatch({ type: "APPLY_FUNCTION", payload: fn });

    return {
        state,
        addDigit,
        chooseOperation,
        clear,
        evaluateResult,
        applyFunction,
    };
}
