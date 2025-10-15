import React from "react";
import { Cpu, MemoryStick, HardDrive, Server } from "lucide-react";

export type Metric = "cpu" | "memory" | "disk" | "network";
export type ChartType = "bar" | "radial" | "line";

export interface MetricConfig {
    key: Metric;
    label: string;
    icon: React.ReactNode;
    textColor: string;
    bgColor: string;
    range: [number, number];
}

export const metricsConfig: MetricConfig[] = [
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
