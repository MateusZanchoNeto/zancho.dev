export type ButtonType = "digit" | "operator" | "function";

interface KeypadButton {
    label: string;
    type: ButtonType;
    action: string;
    span?: number;
}

export const keypadLayout: KeypadButton[] = [
    { label: "AC", type: "function", action: "clear" },
    { label: "sin", type: "function", action: "sin" },
    { label: "cos", type: "function", action: "cos" },
    { label: "÷", type: "operator", action: "chooseOperation" },
    { label: "7", type: "digit", action: "addDigit" },
    { label: "8", type: "digit", action: "addDigit" },
    { label: "9", type: "digit", action: "addDigit" },
    { label: "×", type: "operator", action: "chooseOperation" },
    { label: "4", type: "digit", action: "addDigit" },
    { label: "5", type: "digit", action: "addDigit" },
    { label: "6", type: "digit", action: "addDigit" },
    { label: "-", type: "operator", action: "chooseOperation" },
    { label: "1", type: "digit", action: "addDigit" },
    { label: "2", type: "digit", action: "addDigit" },
    { label: "3", type: "digit", action: "addDigit" },
    { label: "+", type: "operator", action: "chooseOperation" },
    { label: "0", type: "digit", action: "addDigit", span: 2 },
    { label: ".", type: "digit", action: "addDigit" },
    { label: "=", type: "operator", action: "evaluate" },
];
