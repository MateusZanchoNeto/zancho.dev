"use client";

import React, { useState, useEffect } from "react";
import ProgressBarChart from "./ProgressBarChart";
import RadialChart from "./RadialChart";
import LineChart from "./LineChart";
import ChartSelector from "./ChartSelector";

type ChartType = "bar" | "radial" | "line";
type Metric = "cpu" | "memory" | "disk" | "network";

const METRICS: {
    key: Metric;
    label: string;
    colorClass: string;
    range: [number, number];
}[] = [
        { key: "cpu", label: "CPU", colorClass: "text-cyan-500", range: [15, 30] },
        {
            key: "memory",
            label: "Memory",
            colorClass: "text-purple-500",
            range: [50, 75],
        },
        { key: "disk", label: "Disk", colorClass: "text-amber-500", range: [50, 60] },
        {
            key: "network",
            label: "Network",
            colorClass: "text-green-500",
            range: [15, 24],
        },
    ];

const getRandomUsage = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const TaskManager: React.FC = () => {
    const [usage, setUsage] = useState(() =>
        Object.fromEntries(METRICS.map((m) => [m.key, getRandomUsage(...m.range)])),
    );
    const [chartTypes, setChartTypes] = useState(() =>
        Object.fromEntries(
            METRICS.map((m) => [m.key, "bar"] as [Metric, ChartType]),
        ),
    );
    const [history, setHistory] = useState(() =>
        Object.fromEntries(METRICS.map((m) => [m.key, Array(15).fill(0)])),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const newUsage = { ...usage };
            const newHistory = { ...history };

            METRICS.forEach((m) => {
                const newValue = getRandomUsage(...m.range);
                newUsage[m.key] = newValue;
                newHistory[m.key] = [...newHistory[m.key].slice(1), newValue];
            });

            setUsage(newUsage);
            setHistory(newHistory);
        }, 2000);

        return () => clearInterval(interval);
    }, [usage, history]);

    const handleChartTypeChange = (metric: Metric, type: ChartType) => {
        setChartTypes((prev) => ({ ...prev, [metric]: type }));
    };

    const renderChart = (metric: (typeof METRICS)[0]) => {
        const percentage = usage[metric.key];
        const dataHistory = history[metric.key];

        switch (chartTypes[metric.key]) {
            case "radial":
                return (
                    <RadialChart percentage={percentage} colorClass={metric.colorClass} />
                );
            case "line":
                return (
                    <LineChart history={dataHistory} colorClass={metric.colorClass} />
                );
            case "bar":
            default:
                return (
                    <ProgressBarChart
                        percentage={percentage}
                        colorClass={metric.colorClass.replace("text-", "bg-")}
                    />
                );
        }
    };

    return (
        <div className="w-full h-full bg-gray-800 p-4 flex flex-col gap-4">
            {METRICS.map((metric) => (
                <div key={metric.key} className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-gray-300">{metric.label}</span>
                        <ChartSelector
                            selected={chartTypes[metric.key]}
                            onChange={(type) => handleChartTypeChange(metric.key, type)}
                        />
                    </div>
                    {renderChart(metric)}
                </div>
            ))}
        </div>
    );
};

export default TaskManager;
