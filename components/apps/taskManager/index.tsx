"use client";

import React from "react";
import { useSystemMetrics } from "./useSystemMetrics";
import { metricsConfig } from "./taskManagerData";
import MetricDisplay from "./MetricDisplay";

const TaskManager: React.FC = () => {
    const { usage, history } = useSystemMetrics();

    return (
        <div className="w-full h-full bg-gray-800 p-4 flex flex-col gap-4 rounded-xl">
            {metricsConfig.map((metric) => (
                <MetricDisplay
                    key={metric.key}
                    metric={metric}
                    usage={usage[metric.key]}
                    history={history[metric.key]}
                />
            ))}
        </div>
    );
};

export default TaskManager;
