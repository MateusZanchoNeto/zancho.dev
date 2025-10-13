"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
    loginAsVisitor,
    verifyOwnerPassword,
} from "@/lib/redux/slices/appSlice";
import AnimatedRings from "./AnimatedRings";
import ScrambleQuote from "./ScrambleQuote";
import { openWindow } from "@/lib/redux/slices/windowsSlice";

export default function LoginScreen() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticating, authError } = useSelector(
        (state: RootState) => state.app,
    );

    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [password, setPassword] = useState("");

    const handleVisitorLogin = () => {
        dispatch(loginAsVisitor());
        dispatch(
            openWindow({
                id: "aboutMe",
                title: "About Me",
                size: { width: 700, height: 550 },
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
                    }),
                );
            }
        });
    };

    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-mono relative p-4 gap-12">
            <AnimatedRings />

            <div className="w-full max-w-sm p-8 bg-gray-900 border border-green-700 text-green-400 text-center z-30 rounded-2xl animate-pulse-glow">
                <h1 className="text-2xl mb-6">[ zancho.dev ]</h1>
                {!showPasswordInput ? (
                    <div className="space-y-4">
                        <h2 className="mb-4">Select User:</h2>
                        <button
                            onClick={() => dispatch(handleVisitorLogin)}
                            className="w-full p-2 bg-green-900 border border-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-2xl"
                        >
                            Visitor
                        </button>
                        <button
                            onClick={() => setShowPasswordInput(true)}
                            className="w-full p-2 bg-green-900 border border-green-600 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-2xl"
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
                                className="w-full p-2 mb-4 bg-black border border-green-600 text-green-400 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-2xl"
                            />
                            <button
                                type="submit"
                                disabled={isAuthenticating}
                                className="w-full p-2 bg-green-900 border border-green-600 hover:bg-green-800 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-2xl"
                            >
                                {isAuthenticating ? "Authenticating..." : "Login"}
                            </button>
                        </form>
                        {authError && (
                            <p className="text-red-500 mt-4 text-sm">{authError}</p>
                        )}
                        <button
                            onClick={() => setShowPasswordInput(false)}
                            className="text-sm mt-4 text-green-600 hover:underline"
                        >
                            &larr; Back
                        </button>
                    </div>
                )}
            </div>

            <div className="z-30">
                <ScrambleQuote />
            </div>
        </div>
    );
}
