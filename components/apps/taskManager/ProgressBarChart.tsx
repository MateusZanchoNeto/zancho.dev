import React from "react";

interface Props {
    percentage: number;
    colorClass: string;
}

const ProgressBarChart: React.FC<Props> = ({ percentage, colorClass }) => (
    <div className="flex items-center justify-center h-[80px]">
        <div className="w-full bg-black/50 rounded-full h-4">
            <div
                className={`${colorClass} h-4 rounded-full transition-all duration-500 ease-in-out`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

export default ProgressBarChart;
