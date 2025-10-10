"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface Props {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<Props> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 right-4 bg-gray-900 border border-green-500/50 text-white p-4 rounded-lg shadow-lg flex items-center z-50"
            >
                <CheckCircle className="text-green-500 mr-3" />
                <span>{message}</span>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;
