"use client";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const ShutdownScreen: React.FC = () => {
    const settings = useSelector((state: RootState) => state.settings);

    const isMatrix = settings.theme === "matrix";
    const bgColor = isMatrix ? "bg-black" : "bg-gray-800";
    const textColor = isMatrix ? "text-green-500" : "text-cyan-400";

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center font-mono z-50 p-4 text-center ${bgColor}`}
        >
            {!isMatrix && (
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-md"
                    style={{ backgroundImage: settings.desktopBackground.value }}
                />
            )}

            <div className="relative z-10">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`text-2xl sm:text-3xl mb-4 ${textColor}`}
                >
                    System Shutting Down
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className={`text-base sm:text-lg ${textColor}`}
                >
                    Thank you for visiting.
                </motion.p>
            </div>
        </div>
    );
};

export default ShutdownScreen;
