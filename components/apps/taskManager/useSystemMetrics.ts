import { useState, useEffect } from "react";
import { metricsConfig } from "./taskManagerData";

const getRandomUsage = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export function useSystemMetrics() {
    const [usage, setUsage] = useState(() =>
        Object.fromEntries(
            metricsConfig.map((m) => [m.key, getRandomUsage(...m.range)]),
        ),
    );
    const [history, setHistory] = useState(() =>
        Object.fromEntries(
            metricsConfig.map((m) => [
                m.key,
                Array(15).fill(getRandomUsage(...m.range)),
            ]),
        ),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setUsage((prevUsage) => {
                const newUsage = { ...prevUsage };
                metricsConfig.forEach((m) => {
                    newUsage[m.key] = getRandomUsage(...m.range);
                });
                return newUsage;
            });

            setHistory((prevHistory) => {
                const newHistory = { ...prevHistory };
                metricsConfig.forEach((m) => {
                    newHistory[m.key] = [...newHistory[m.key].slice(1), usage[m.key]];
                });
                return newHistory;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [usage]);

    return { usage, history };
}
