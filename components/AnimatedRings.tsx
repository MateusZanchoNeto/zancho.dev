import React from "react";

const AnimatedRings: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
            <div
                className="
        absolute w-96 h-96 border-2 border-green-700 rounded-lg opacity-30
        animate-ring-rotate-slow
      "
            ></div>

            <div
                className="
        absolute w-80 h-80 border-2 border-green-600 rounded-lg opacity-20
        animate-ring-rotate-fast
        transform translate-x-8 translate-y-8
      "
            ></div>
        </div>
    );
};

export default AnimatedRings;
