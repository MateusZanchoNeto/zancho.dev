import React from "react";

const CalculatorDisplay = ({ value }: { value: string }) => (
    <div className="bg-black/50 text-white text-5xl text-right p-4 rounded-lg mb-2 break-words">
        {value}
    </div>
);

export default CalculatorDisplay;
