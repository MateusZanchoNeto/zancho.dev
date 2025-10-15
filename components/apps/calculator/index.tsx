"use client";

import React from "react";
import { useCalculator } from "./useCalculator";
import CalculatorDisplay from "./CalculatorDisplay";
import CalculatorKeypad from "./CalculatorKeypad";

const Calculator: React.FC = () => {
    const {
        state,
        addDigit,
        chooseOperation,
        clear,
        evaluateResult,
        applyFunction,
    } = useCalculator();

    const actions = {
        addDigit,
        chooseOperation,
        clear,
        evaluate: evaluateResult,
        sin: () => applyFunction((deg) => Math.sin((deg * Math.PI) / 180)),
        cos: () => applyFunction((deg) => Math.cos((deg * Math.PI) / 180)),
    };

    return (
        <div className="w-full bg-gray-800 flex flex-col p-2 rounded-xl">
            <CalculatorDisplay value={state.currentOperand} />
            <CalculatorKeypad actions={actions} />
        </div>
    );
};

export default Calculator;
