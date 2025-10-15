/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { keypadLayout } from "./keypadLayout";

interface KeypadActions {
    addDigit: (digit: string) => void;
    chooseOperation: (op: string) => void;
    clear: () => void;
    evaluate: () => void;
    sin: () => void;
    cos: () => void;
}

const CalculatorKeypad = ({ actions }: { actions: KeypadActions }) => {
    const baseBtn =
        "rounded-lg text-2xl h-16 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400";
    const styles = {
        digit: `${baseBtn} bg-gray-600 hover:bg-gray-500 text-white`,
        operator: `${baseBtn} bg-emerald-700 hover:bg-emerald-600 text-white`,
        function: `${baseBtn} bg-gray-400 hover:bg-gray-300 text-black`,
    };

    return (
        <div className="flex-grow grid grid-cols-4 grid-rows-5 gap-2">
            {keypadLayout.map(({ label, type, action, span }) => (
                <button
                    key={label}
                    onClick={() => (actions as any)[action](label)}
                    className={`${styles[type]} ${span === 2 ? "col-span-2" : ""}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
};

export default CalculatorKeypad;
