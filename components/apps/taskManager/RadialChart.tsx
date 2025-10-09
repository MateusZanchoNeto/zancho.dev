import React from "react";

interface Props {
    percentage: number;
    colorClass: string;
}

const RadialChart: React.FC<Props> = ({ percentage, colorClass }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex items-center justify-center">
            <svg className="transform -rotate-90" width="80" height="80">
                <circle
                    className="text-gray-700"
                    strokeWidth="6"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                />
                <circle
                    className={colorClass}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                />
            </svg>
            <span className="absolute text-xl font-mono">{percentage}%</span>
        </div>
    );
};

export default RadialChart;
