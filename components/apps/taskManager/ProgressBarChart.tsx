import React from "react";

interface Props {
    percentage: number;
    colorClass: string;
}

const ProgressBarChart: React.FC<Props> = ({ percentage, colorClass }) => (
    <div className="w-full bg-black/50 rounded-full h-4">
        <div
            className={`${colorClass} h-4 rounded-full transition-all duration-500 ease-in-out`}
            style={{ width: `${percentage}%` }}
        />
    </div>
);

export default ProgressBarChart;
