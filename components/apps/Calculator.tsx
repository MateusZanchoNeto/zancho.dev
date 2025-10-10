"use client";

import React, { useState } from "react";

type Operator = "+" | "-" | "×" | "÷";
type ScientificOperator = "sin" | "cos";

const Calculator: React.FC = () => {
    const [displayValue, setDisplayValue] = useState("0");
    const [firstOperand, setFirstOperand] = useState<number | null>(null);
    const [operator, setOperator] = useState<Operator | null>(null);
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

    const inputDigit = (digit: string) => {
        if (waitingForSecondOperand) {
            setDisplayValue(digit);
            setWaitingForSecondOperand(false);
        } else {
            setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
        }
    };

    const inputDecimal = () => {
        if (!displayValue.includes(".")) {
            setDisplayValue(displayValue + ".");
        }
    };

    const clearAll = () => {
        setDisplayValue("0");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
    };

    const performCalculation = (
        first: number,
        second: number,
        op: Operator,
    ): number => {
        switch (op) {
            case "+":
                return first + second;
            case "-":
                return first - second;
            case "×":
                return first * second;
            case "÷":
                return first / second;
            default:
                return second;
        }
    };

    const handleOperator = (nextOperator: Operator) => {
        const inputValue = parseFloat(displayValue);

        if (operator && firstOperand !== null) {
            const result = performCalculation(firstOperand, inputValue, operator);
            setDisplayValue(String(result));
            setFirstOperand(result);
        } else {
            setFirstOperand(inputValue);
        }

        setWaitingForSecondOperand(true);
        setOperator(nextOperator);
    };

    const handleEquals = () => {
        if (operator && firstOperand !== null) {
            const secondOperand = parseFloat(displayValue);
            const result = performCalculation(firstOperand, secondOperand, operator);
            setDisplayValue(String(result));
            setFirstOperand(null);
            setOperator(null);
            setWaitingForSecondOperand(false);
        }
    };

    const handleScientificOperator = (sciOp: ScientificOperator) => {
        const currentValue = parseFloat(displayValue);
        const radians = (currentValue * Math.PI) / 180;
        let result = 0;

        switch (sciOp) {
            case "sin":
                result = Math.sin(radians);
                break;
            case "cos":
                result = Math.cos(radians);
                break;
            default:
                return;
        }

        setDisplayValue(String(parseFloat(result.toFixed(10))));
        setWaitingForSecondOperand(true);
    };

    const baseBtn =
        "rounded-lg text-2xl h-16 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400";
    const digitBtn = `${baseBtn} bg-gray-600 hover:bg-gray-500 text-white`;
    const operatorBtn = `${baseBtn} bg-emerald-700 hover:bg-emerald-600 text-white`;
    const functionBtn = `${baseBtn} bg-gray-400 hover:bg-gray-300 text-black`;

    return (
        <div className="w-full h-full bg-gray-800 flex flex-col p-2 rounded-xl">
            <div className="bg-black/50 text-white text-5xl text-right p-4 rounded-lg mb-2 break-words">
                {displayValue}
            </div>

            <div className="flex-grow grid grid-cols-4 grid-rows-5 gap-2">
                <button onClick={clearAll} className={functionBtn}>
                    AC
                </button>
                <button
                    onClick={() => handleScientificOperator("sin")}
                    className={functionBtn}
                >
                    sin
                </button>
                <button
                    onClick={() => handleScientificOperator("cos")}
                    className={functionBtn}
                >
                    cos
                </button>

                <button onClick={() => handleOperator("÷")} className={operatorBtn}>
                    ÷
                </button>

                <button onClick={() => inputDigit("7")} className={digitBtn}>
                    7
                </button>
                <button onClick={() => inputDigit("8")} className={digitBtn}>
                    8
                </button>
                <button onClick={() => inputDigit("9")} className={digitBtn}>
                    9
                </button>
                <button onClick={() => handleOperator("×")} className={operatorBtn}>
                    ×
                </button>

                <button onClick={() => inputDigit("4")} className={digitBtn}>
                    4
                </button>
                <button onClick={() => inputDigit("5")} className={digitBtn}>
                    5
                </button>
                <button onClick={() => inputDigit("6")} className={digitBtn}>
                    6
                </button>
                <button onClick={() => handleOperator("-")} className={operatorBtn}>
                    -
                </button>

                <button onClick={() => inputDigit("1")} className={digitBtn}>
                    1
                </button>
                <button onClick={() => inputDigit("2")} className={digitBtn}>
                    2
                </button>
                <button onClick={() => inputDigit("3")} className={digitBtn}>
                    3
                </button>
                <button onClick={() => handleOperator("+")} className={operatorBtn}>
                    +
                </button>

                <button
                    onClick={() => inputDigit("0")}
                    className={`${digitBtn} col-span-2`}
                >
                    0
                </button>
                <button onClick={inputDecimal} className={digitBtn}>
                    .
                </button>
                <button onClick={handleEquals} className={operatorBtn}>
                    =
                </button>
            </div>
        </div>
    );
};

export default Calculator;
