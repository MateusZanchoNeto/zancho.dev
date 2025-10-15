import React from "react";
import { ArrowLeft, ArrowRight, RotateCw, Globe } from "lucide-react";

interface Props {
    inputValue: string;
    onInputChange: (value: string) => void;
    onSubmit: () => void;
    onBack: () => void;
    onForward: () => void;
    onRefresh: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
}

const BrowserChrome: React.FC<Props> = ({
    inputValue,
    onInputChange,
    onSubmit,
    onBack,
    onForward,
    onRefresh,
    canGoBack,
    canGoForward,
}) => (
    <div className="flex items-center gap-2 p-2 bg-gray-800 border-b border-white/10 flex-shrink-0 rounded-t-xl">
        <button
            onClick={onBack}
            disabled={!canGoBack}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <ArrowLeft size={16} />
        </button>
        <button
            onClick={onForward}
            disabled={!canGoForward}
            className="p-1.5 rounded-full hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <ArrowRight size={16} />
        </button>
        <button
            onClick={onRefresh}
            className="p-1.5 rounded-full hover:bg-white/10"
        >
            <RotateCw size={16} />
        </button>
        <div className="flex-1 relative">
            <Globe
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full bg-black/50 rounded-full pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </form>
        </div>
    </div>
);

export default BrowserChrome;
