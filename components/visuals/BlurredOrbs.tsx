import React from "react";

const BlurredOrbs: React.FC = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div
                className="
        absolute w-96 h-96 sm:w-[500px] sm:h-[500px]
        bg-green-500 rounded-full mix-blend-multiply opacity-30 blur-3xl
        top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2
        animate-orb-move-1
      "
            ></div>

            <div
                className="
        absolute w-80 h-80 sm:w-[400px] sm:h-[400px]
        bg-emerald-600 rounded-full mix-blend-multiply opacity-20 blur-xl
        bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2
        animate-orb-move-2
      "
            ></div>
        </div>
    );
};

export default BlurredOrbs;
