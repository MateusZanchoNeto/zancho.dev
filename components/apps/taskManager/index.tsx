"use client";

import React, { useState, useEffect } from "react";
import ProgressBarChart from "./ProgressBarChart";
import RadialChart from "./RadialChart";
import LineChart from "./LineChart";
import ChartSelector from "./ChartSelector";
import { Cpu, MemoryStick, HardDrive, Server } from "lucide-react";

type ChartType = "bar" | "radial" | "line";
type Metric = "cpu" | "memory" | "disk" | "network";

const METRICS: {
    key: Metric;
    label: string;
    icon: React.ReactNode;
    textColor: string;
    bgColor: string;
    range: [number, number];
}[] = [
        {
            key: "cpu",
            label: "CPU",
            icon: <Cpu size={20} />,
            textColor: "text-cyan-500",
            bgColor: "bg-cyan-500",
            range: [15, 30],
        },
        {
            key: "memory",
            label: "Memory",
            icon: <MemoryStick size={20} />,
            textColor: "text-purple-500",
            bgColor: "bg-purple-500",
            range: [50, 75],
        },
        {
            key: "disk",
            label: "Disk",
            icon: <HardDrive size={20} />,
            textColor: "text-amber-500",
            bgColor: "bg-amber-500",
            range: [50, 60],
        },
        {
            key: "network",
            label: "Network",
            icon: <Server size={20} />,
            textColor: "text-green-500",
            bgColor: "bg-green-500",
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
                    <RadialChart percentage={percentage} colorClass={metric.textColor} />
                );
            case "line":
                return (
                    <LineChart history={dataHistory} colorClass={metric.textColor} />
                );
            case "bar":
            default:
                return (
                    <ProgressBarChart
                        percentage={percentage}
                        colorClass={metric.bgColor}
                    />
                );
        }
    };

    return (
        <div className="w-full h-full bg-gray-800 p-4 flex flex-col gap-4 rounded-xl">
            {METRICS.map((metric) => (
                <div key={metric.key} className="bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2 font-mono text-gray-300">
                            <span className={metric.textColor}>{metric.icon}</span>
                            <span>{metric.label}</span>
                        </div>
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
