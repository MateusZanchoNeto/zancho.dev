import React, { useState } from "react";
import { MetricConfig, ChartType } from "./taskManagerData";
import ChartSelector from "./ChartSelector";
import RadialChart from "./RadialChart";
import LineChart from "./LineChart";
import ProgressBarChart from "./ProgressBarChart";

interface Props {
    metric: MetricConfig;
    usage: number;
    history: number[];
}

const MetricDisplay: React.FC<Props> = ({ metric, usage, history }) => {
    const [chartType, setChartType] = useState<ChartType>("bar");

    const renderChart = () => {
        switch (chartType) {
            case "radial":
                return <RadialChart percentage={usage} colorClass={metric.textColor} />;
            case "line":
                return <LineChart history={history} colorClass={metric.textColor} />;
            case "bar":
            default:
                return (
                    <ProgressBarChart percentage={usage} colorClass={metric.bgColor} />
                );
        }
    };

    return (
        <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 font-mono text-gray-300">
                    <span className={metric.textColor}>{metric.icon}</span>
                    <span>{metric.label}</span>
                </div>
                <ChartSelector selected={chartType} onChange={setChartType} />
            </div>
            {renderChart()}
        </div>
    );
};

export default MetricDisplay;
