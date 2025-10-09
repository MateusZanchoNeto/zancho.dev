"use client";

import { useState, useEffect, useRef } from "react";

const morpheusQuote =
    'There\'s a difference between knowing the path and walking the path\n- Morpheus, "The Matrix"';
const SCRAMBLE_CHARS = "#$%&*+-<=>?@[\\]^_";
const REVEAL_SPEED_MS = 30;
const SCRAMBLE_SPEED_MS = 25;
const SCRAMBLE_ITERATIONS = 2;

export default function ScrambleQuote() {
    const [typedQuote, setTypedQuote] = useState("");
    const [showCursor, setShowCursor] = useState(true);

    const quoteIndex = useRef(0);
    const scrambleIteration = useRef(0);
    const animationTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 400);

        const scrambleEffect = () => {
            if (quoteIndex.current >= morpheusQuote.length) {
                setShowCursor(false);
                clearInterval(cursorInterval);
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

        setTimeout(scrambleEffect, 500);

        return () => {
            clearInterval(cursorInterval);
            if (animationTimeout.current) {
                clearTimeout(animationTimeout.current);
            }
        };
    }, []);

    return (
        <div className="w-full max-w-lg bg-gray-900 border border-green-800 text-green-400 p-4 shadow-lg rounded-xl">
            <p className="font-mono text-center text-sm whitespace-pre-wrap font-bold">
                <span>{typedQuote}</span>
                {showCursor && <span className="animate-blink">_</span>}
            </p>
        </div>
    );
}
