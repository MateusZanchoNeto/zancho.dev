"use client";

import React, { useState, useEffect } from "react";
import { useBrowserHistory } from "./useBrowserHistory";
import BrowserChrome from "./BrowserChrome";
import BrowserContent from "./BrowserContent";

const Browser: React.FC = () => {
    const { currentUrl, back, forward, navigate, canGoBack, canGoForward } =
        useBrowserHistory();

    const [inputValue, setInputValue] = useState(currentUrl);
    const [iframeKey, setIframeKey] = useState(0);

    useEffect(() => {
        setInputValue(currentUrl);
    }, [currentUrl]);

    const handleRefresh = () => {
        setIframeKey((prev) => prev + 1);
    };

    return (
        <div className="w-full bg-gray-900 flex flex-col text-white rounded-xl">
            <BrowserChrome
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSubmit={() => navigate(inputValue)}
                onBack={back}
                onForward={forward}
                onRefresh={handleRefresh}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
            />
            <BrowserContent url={currentUrl} iframeKey={iframeKey} />
        </div>
    );
};

export default Browser;
