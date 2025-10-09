"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { finishBooting } from "@/lib/redux/slices/appSlice";

const morpheusQuote =
    'There\'s a difference between knowing the path and walking the path\n- Morpheus, "The Matrix"';
const SCRAMBLE_CHARS = "#$%&*+-<=>?@[\\]^_";
const REVEAL_SPEED_MS = 10;
const SCRAMBLE_SPEED_MS = 25;
const SCRAMBLE_ITERATIONS = 2;

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [typedQuote, setTypedQuote] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    const quoteIndex = useRef(0);
    const scrambleIteration = useRef(0);
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

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
        }, 60);

        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 400);

        const scrambleEffect = () => {
            if (quoteIndex.current >= morpheusQuote.length) {
                return;
            }

            const isRevealingChar = scrambleIteration.current === SCRAMBLE_ITERATIONS;

            let displayText = "";
            for (let i = 0; i < morpheusQuote.length; i++) {
                if (i < quoteIndex.current) {
                    displayText += morpheusQuote[i];
                } else if (i === quoteIndex.current) {
                    if (isRevealingChar) {
                        displayText += morpheusQuote[i];
                    } else {
                        const randomIndex = Math.floor(
                            Math.random() * SCRAMBLE_CHARS.length,
                        );
                        displayText += SCRAMBLE_CHARS[randomIndex];
                    }
                } else {
                    displayText += " ";
                }
            }

            setTypedQuote(displayText.trimEnd());

            if (isRevealingChar) {
                quoteIndex.current++;
                scrambleIteration.current = 0;
                animationTimeout.current = setTimeout(scrambleEffect, REVEAL_SPEED_MS);
            } else {
                scrambleIteration.current++;
                animationTimeout.current = setTimeout(
                    scrambleEffect,
                    SCRAMBLE_SPEED_MS,
                );
            }
        };

        scrambleEffect();

        return () => {
            clearInterval(loadingInterval);
            clearInterval(cursorInterval);
            if (animationTimeout.current) {
                clearTimeout(animationTimeout.current);
            }
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
                <p className="text-green-500 font-mono mt-2 text-sm mb-12">
                    Booting Linux... [{progress}%]
                </p>

                <div className="bg-gray-900 border border-green-800 text-green-400 p-4 max-w-lg mx-auto shadow-lg">
                    <p className="font-mono text-left text-sm whitespace-pre-wrap h-10 font-bold">
                        {typedQuote}
                        {showCursor && quoteIndex.current < morpheusQuote.length && (
                            <span className="animate-blink">_</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
