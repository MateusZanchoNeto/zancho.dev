"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { finishBooting } from "@/lib/redux/slices/appSlice";
import { RootState } from "@/lib/redux/store";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const settings = useSelector((state: RootState) => state.settings);

    useEffect(() => {
        const loadingInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(loadingInterval);
                    setTimeout(() => dispatch(finishBooting()), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 25);

        return () => clearInterval(loadingInterval);
    }, [dispatch]);

    const isMatrix = settings.theme === "matrix";
    const profileImage = isMatrix ? "/matrix-profile.jpg" : "/profile.jpg";
    const bgColor = isMatrix ? "bg-black" : "bg-gray-800";
    const textColor = isMatrix ? "text-green-500" : "text-gray-200";
    const borderColor = isMatrix ? "border-green-700" : "border-gray-500";
    const progressBg = isMatrix ? "bg-gray-800" : "bg-gray-700";
    const progressBar = isMatrix ? "bg-green-500" : "bg-cyan-500";

    return (
        <div
            className={`fixed inset-0 flex flex-col items-center justify-center z-50 p-4 ${bgColor}`}
        >
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md opacity-30"
                style={{ backgroundImage: settings.desktopBackground.value }}
            />

            <div className="text-center z-10">
                <Image
                    src={profileImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    className={`rounded-full mx-auto mb-4 border-2 ${borderColor}`}
                    priority
                />
                <h1 className={`text-2xl font-mono mb-6 ${textColor}`}>zancho.dev</h1>
                <div
                    className={`w-64 md:w-96 p-1 mx-auto mb-8 border ${borderColor} ${progressBg}`}
                >
                    <div
                        className={`h-3 transition-all duration-150 ease-linear ${progressBar}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className={`font-mono mt-2 text-sm ${textColor}`}>
                    Booting System... [{progress}%]
                </p>
            </div>
        </div>
    );
}
