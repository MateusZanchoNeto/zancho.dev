"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { openWindow } from "@/lib/redux/slices/windowsSlice";
import {
    User,
    Briefcase,
    MessageSquare,
    Settings,
    Calculator,
    BookText,
    TerminalSquare,
    Folder,
    Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import Tooltip from "@/components/common/Tooltip";

const apps = [
    {
        id: "aboutMe",
        title: "About Me",
        icon: <User />,
        defaultSize: { width: 700, height: 550 },
    },
    {
        id: "projects",
        title: "Projects",
        icon: <Briefcase />,
        defaultSize: { width: 850, height: 600 },
    },
    {
        id: "contact",
        title: "Get In Touch",
        icon: <MessageSquare />,
        defaultSize: { width: 850, height: 450 },
    },
    {
        id: "settings",
        title: "Settings",
        icon: <Settings />,
        defaultSize: { width: 600, height: 550 },
    },
    {
        id: "browser",
        title: "Browser",
        icon: <Globe />,
        defaultSize: { width: 900, height: 600 },
    },

    {
        id: "files",
        title: "Files",
        icon: <Folder />,
        defaultSize: { width: 800, height: 600 },
    },
    {
        id: "calculator",
        title: "Calculator",
        icon: <Calculator />,
        defaultSize: { width: 320, height: 460 },
    },
    {
        id: "notes",
        title: "Notes",
        icon: <BookText />,
        defaultSize: { width: 750, height: 500 },
    },
    {
        id: "taskManager",
        title: "Task Manager",
        icon: <TerminalSquare />,
        defaultSize: { width: 450, height: 320 },
    },
];

const MOBILE_WIDTH_THRESHOLD = 768;

const Toolbar: React.FC = () => {
    const dispatch = useDispatch();
    const isMobile = typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;

    const handleIconClick = (app: (typeof apps)[0]) => {
        dispatch(
            openWindow({
                id: app.id,
                title: app.title,
                size: app.defaultSize,
                isMobile,
            })
        );
    };

    return (
        <div className="w-full flex flex-shrink-0 justify-center p-2 absolute bottom-0 z-20">
            <div className="flex items-center justify-center space-x-2 bg-black/50 backdrop-blur-md p-2 rounded-xl border border-white/10">
                {apps.map((app) => (
                    <Tooltip text={app.title} key={app.id} position="top">
                        <motion.button
                            onClick={() => handleIconClick(app)}
                            className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center text-gray-300 hover:bg-white/20 rounded-lg"
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            {React.cloneElement(app.icon, { size: 28 })}
                        </motion.button>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default Toolbar;
