import React from "react";

interface Props {
    history: number[];
    colorClass: string;
}

const LineChart: React.FC<Props> = ({ history, colorClass }) => {
    const width = 200;
    const height = 60;

    const points = history
        .map((point, i) => {
            const x = (i / (history.length - 1)) * width;
            const y = height - (point / 100) * height;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <div className="flex items-center justify-center h-[80px]">
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                <polyline
                    fill="none"
                    className={colorClass}
                    stroke="currentColor"
                    strokeWidth="2"
                    points={points}
                />
            </svg>
        </div>
    );
};

export default LineChart;
