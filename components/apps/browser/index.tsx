"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Globe } from "lucide-react";

const Browser: React.FC = () => {
    const initialUrl = "https://www.google.com/webhp?igu=1";

    const [currentUrl, setCurrentUrl] = useState(initialUrl);
    const [inputValue, setInputValue] = useState(initialUrl);
    const [history, setHistory] = useState([initialUrl]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [iframeKey, setIframeKey] = useState(0);

    const navigateTo = (url: string) => {
        let fullUrl = url.trim();
        if (!/^https?:\/\//i.test(fullUrl)) {
            fullUrl = "https://" + fullUrl;
        }

        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(fullUrl);

        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setCurrentUrl(fullUrl);
        setInputValue(fullUrl);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigateTo(inputValue);
    };

    const handleBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentUrl(history[newIndex]);
            setInputValue(history[newIndex]);
        }
    };

    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentUrl(history[newIndex]);
            setInputValue(history[newIndex]);
        }
    };

    const handleRefresh = () => {
        setIframeKey((prevKey) => prevKey + 1);
    };

    return (
        <div className="w-full h-full bg-gray-900 flex flex-col text-white rounded-xl">
            <div className="flex items-center gap-2 p-2 bg-gray-800 border-b border-white/10 rounded-t-xl">
                <button
                    onClick={handleBack}
                    disabled={historyIndex === 0}
                    className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeft size={16} />
                </button>
                <button
                    onClick={handleForward}
                    disabled={historyIndex === history.length - 1}
                    className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowRight size={16} />
                </button>
                <button
                    onClick={handleRefresh}
                    className="p-1.5 rounded-full hover:bg-white/10"
                >
                    <RotateCw size={16} />
                </button>

                <div className="flex-1 relative">
                    <Globe
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full bg-black/50 rounded-full pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Search or enter address"
                        />
                    </form>
                </div>
            </div>

            <iframe
                key={iframeKey}
                src={currentUrl}
                className="w-full h-[500px] border-0 flex-grow bg-white rounded-b-xl"
                title="Browser Content"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onError={() => console.error(`Failed to load ${currentUrl}`)}
            ></iframe>
        </div>
    );
};

export default Browser;
