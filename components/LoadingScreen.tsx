"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { finishBooting } from "@/lib/redux/slices/appSlice";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();

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
        }, 20);

        return () => {
            clearInterval(loadingInterval);
        };
    }, [dispatch]);

    return (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-4">
            <div className="text-center">
                <Image
                    src="/profile.jpg"
                    alt="Profile"
                    width={128}
                    height={128}
                    className="rounded-full mx-auto mb-4 border-2 border-green-700"
                    priority
                />
                <h1 className="text-2xl font-mono text-green-500 mb-6">zancho.dev</h1>
                <div className="w-64 md:w-96 bg-gray-800 border border-green-700 p-1 mx-auto mb-8">
                    <div
                        className="h-3 bg-green-500 transition-all duration-150 ease-linear"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-green-500 font-mono mt-2 text-sm">
                    Booting Linux... [{progress}%]
                </p>
            </div>
        </div>
    );
}
