"use client";

import React, { useState } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    position?: "top" | "bottom";
}

const Tooltip: React.FC<TooltipProps> = ({
    text,
    children,
    position = "bottom",
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className={`
            absolute ${positionClasses[position]}
            px-2 py-1 bg-gray-900 text-gray-200 text-xs
            rounded-md whitespace-nowrap shadow-lg
            border border-white/20 z-30
          `}
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
