"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
    loginAsVisitor,
    verifyOwnerPassword,
} from "@/lib/redux/slices/appSlice";
import { openWindow } from "@/lib/redux/slices/windowsSlice";
import AnimatedRings from "@/components/visuals/AnimatedRings";
import BlurredOrbs from "@/components/visuals/BlurredOrbs";
import ScrambleQuote from "@/components/visuals/ScrambleQuote";

const MOBILE_WIDTH_THRESHOLD = 768;

export default function LoginScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const isMobile =
        typeof window !== "undefined" && window.innerWidth < MOBILE_WIDTH_THRESHOLD;
    const { isAuthenticating, authError } = useSelector(
        (state: RootState) => state.app,
    );
    const settings = useSelector((state: RootState) => state.settings);

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState("");

    const handleVisitorLogin = () => {
        dispatch(loginAsVisitor());
        dispatch(
            openWindow({
                id: "aboutMe",
                title: "About Me",
                size: { width: 700, height: 550 },
                isMobile,
            }),
        );
    };

    const handleOwnerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(verifyOwnerPassword(password)).then((result) => {
            if (result.type.endsWith("fulfilled")) {
                dispatch(
                    openWindow({
                        id: "aboutMe",
                        title: "About Me",
                        size: { width: 700, height: 550 },
                        isMobile,
                    }),
                );
            }
        });
    };

    const isMatrix = settings.theme === "matrix";
    const bgColor = isMatrix ? "bg-black" : "bg-gray-800";
    const cardBg = isMatrix ? "bg-gray-900" : "bg-gray-700/50 backdrop-blur-sm";
    const textColor = isMatrix ? "text-green-400" : "text-gray-200";
    const borderColor = isMatrix ? "border-green-700" : "border-white/20";
    const buttonBg = isMatrix ? "bg-green-900" : "bg-cyan-600/50";
    const buttonHoverBg = isMatrix
        ? "hover:bg-green-800"
        : "hover:bg-cyan-500/50";
    const backButtonTextColor = isMatrix ? "text-green-600" : "text-cyan-400";

    return (
        <div
            className={`h-screen w-screen flex flex-col items-center justify-center font-mono relative p-4 gap-12 ${bgColor}`}
        >
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-md"
                style={{ backgroundImage: settings.desktopBackground.value }}
            />
            {isMatrix && <AnimatedRings />}
            {isMatrix && <BlurredOrbs />}

            <div
                className={`w-full max-w-sm p-8 text-center z-30 rounded-2xl ${cardBg} ${textColor} ${borderColor} ${isMatrix ? "animate-pulse-glow" : ""}`}
            >
                <h1 className="text-2xl mb-6">[ zancho.dev ]</h1>
                {!showPasswordInput ? (
                    <div className="space-y-4">
                        <h2 className="mb-4">Select User:</h2>
                        <button
                            onClick={handleVisitorLogin}
                            className={`w-full p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 ${borderColor} ${buttonBg} ${buttonHoverBg}`}
                        >
                            Visitor
                        </button>
                        <button
                            onClick={() => setShowPasswordInput(true)}
                            className={`w-full p-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 ${borderColor} ${buttonBg} ${buttonHoverBg}`}
                        >
                            Owner
                        </button>
                    </div>
                ) : (
                    <div>
                        <h2 className="mb-4">Owner Login:</h2>
                        <form onSubmit={handleOwnerSubmit}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                autoFocus
                                className={`w-full p-2 mb-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 ${isMatrix ? "bg-black border-green-600 text-green-400 placeholder-green-700" : "bg-gray-800 border-gray-500 text-gray-200 placeholder-gray-400"}`}
                            />
                            <button
                                type="submit"
                                disabled={isAuthenticating}
                                className={`w-full p-2 border rounded-2xl disabled:bg-gray-700 disabled:cursor-not-allowed ${borderColor} ${buttonBg} ${buttonHoverBg}`}
                            >
                                {isAuthenticating ? "Authenticating..." : "Login"}
                            </button>
                        </form>
                        {authError && (
                            <p className="text-red-500 mt-4 text-sm">{authError}</p>
                        )}
                        <button
                            onClick={() => setShowPasswordInput(false)}
                            className={`text-sm mt-4 hover:underline ${backButtonTextColor}`}
                        >
                            &larr; Back
                        </button>
                    </div>
                )}
            </div>

            {isMatrix && (
                <div className="z-30">
                    <ScrambleQuote />
                </div>
            )}
        </div>
    );
}
