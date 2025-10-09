"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { rebootSystem, logout } from "@/lib/redux/slices/appSlice";
import {
    Power,
    Wifi,
    Bluetooth,
    BatteryFull,
    Volume2,
    Search,
    RefreshCw,
    LogOut,
    PowerOff,
} from "lucide-react";
import Tooltip from "./Tooltip";

const TopBar: React.FC = () => {
    const dispatch = useDispatch();
    const [isPowerMenuOpen, setIsPowerMenuOpen] = useState(false);
    const powerMenuRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                powerMenuRef.current &&
                !powerMenuRef.current.contains(event.target as Node)
            ) {
                setIsPowerMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleReboot = () => dispatch(rebootSystem());
    const handleLogout = () => dispatch(logout());
    const handleShutdown = () => {
        window.open("", "_self");
        window.close();
    };

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    const formattedDate = time.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="w-full h-8 bg-black/50 backdrop-blur-md flex justify-between items-center px-2 font-mono text-sm text-gray-300 border-b border-white/10 relative z-20">
            <div className="relative" ref={powerMenuRef}>
                <button
                    onClick={() => setIsPowerMenuOpen(!isPowerMenuOpen)}
                    className="p-1 hover:bg-white/20 rounded"
                >
                    <Power size={18} className="text-green-400" />
                </button>

                {isPowerMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-white/20 rounded-md shadow-lg py-1">
                        <button
                            onClick={handleReboot}
                            className="w-full text-left px-3 py-1.5 flex items-center hover:bg-green-500/50"
                        >
                            <RefreshCw size={16} className="mr-2" /> Reboot
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-3 py-1.5 flex items-center hover:bg-green-500/50"
                        >
                            <LogOut size={16} className="mr-2" /> Logout
                        </button>
                        <div className="border-t border-white/10 my-1"></div>
                        <button
                            onClick={handleShutdown}
                            className="w-full text-left px-3 py-1.5 flex items-center text-red-400 hover:bg-red-500/50"
                        >
                            <PowerOff size={16} className="mr-2" /> Shutdown
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-4">
                <Tooltip text="WiFi: Connected">
                    <Wifi size={18} />
                </Tooltip>

                <Tooltip text="Bluetooth: Connected">
                    <Bluetooth size={18} />
                </Tooltip>

                <Tooltip text="Battery: 100%">
                    <div className="flex items-center cursor-default">
                        <BatteryFull size={18} />
                        <span className="ml-1 text-xs">100%</span>
                    </div>
                </Tooltip>

                <Tooltip text="Sound: 100%">
                    <Volume2 size={18} />
                </Tooltip>

                <Tooltip text="Search">
                    <Search size={18} />
                </Tooltip>

                <div className="flex flex-col items-end leading-tight text-xs pr-1">
                    <span>{formattedDate}</span>
                    <span>{formattedTime}</span>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
