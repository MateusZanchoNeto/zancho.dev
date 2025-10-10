"use client";

import { motion } from "framer-motion";

const ShutdownScreen: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono text-green-500 z-50 p-4 text-center">
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-2xl sm:text-3xl mb-4"
            >
                System Shutting Down
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-base sm:text-lg"
            >
                Thank you for visiting.
            </motion.p>
        </div>
    );
};

export default ShutdownScreen;
