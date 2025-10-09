"use client";

import React, { useState } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div
                    className="
          absolute top-full left-1/2 -translate-x-1/2 mt-2
          px-2 py-1 bg-gray-900 text-gray-200 text-xs
          rounded-md whitespace-nowrap shadow-lg
          border border-white/20 z-30
        "
                >
                    {text}
                </div>
            )}
        </div>
    );
};

export default Tooltip;
