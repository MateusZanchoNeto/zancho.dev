/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import {
    closeWindow,
    focusWindow,
    updateWindowPosition,
    toggleFullscreen,
} from "@/lib/redux/slices/windowsSlice";
import { X, Square, Minus } from "lucide-react";

interface WindowProps {
    id: string;
    title: string;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isFullscreen: boolean;
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    zIndex,
    position,
    size,
    isFullscreen,
    children,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);

    const handleFocus = () => {
        dispatch(focusWindow(id));
    };
    const handleClose = () => dispatch(closeWindow(id));
    const handleMinimize = () => dispatch(closeWindow(id));
    const handleFullscreen = () => dispatch(toggleFullscreen(id));
    const handleDragStop = (_e: any, data: any) => {
        if (!isFullscreen) {
            dispatch(
                updateWindowPosition({ id, position: { x: data.x, y: data.y } }),
            );
        }
    };

    const windowContent = (
        <>
            <div className="handle h-8 bg-black/30 flex items-center justify-between px-2 cursor-move rounded-t-lg flex-shrink-0">
                <span className="font-mono text-xs text-gray-300">{title}</span>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleMinimize}
                        className="p-1 rounded-full hover:bg-yellow-500/80"
                    >
                        <Minus size={16} />
                    </button>
                    <button
                        onClick={handleFullscreen}
                        className="p-1 rounded-full hover:bg-green-500/80"
                    >
                        <Square size={14} />
                    </button>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-full hover:bg-red-500/80"
                    >
                        <X size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-grow p-4 overflow-auto text-gray-200">
                {children}
            </div>
        </>
    );

    if (isFullscreen) {
        return (
            <div
                className="absolute top-0 left-0 w-full h-full bg-gray-900/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl flex flex-col"
                style={{ zIndex }}
                onMouseDown={handleFocus}
            >
                {windowContent}
            </div>
        );
    }

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".handle"
            position={position}
            onStart={handleFocus}
            onStop={handleDragStop}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                className="absolute min-w-[300px] min-h-[200px] bg-gray-900/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl flex flex-col"
                style={{
                    zIndex,
                    width: `${size.width}px`,
                    minHeight: `${size.height}px`,
                    maxHeight: "calc(100vh - 7rem)",
                }}
                onMouseDown={handleFocus}
            >
                {windowContent}
            </div>
        </Draggable>
    );
};

export default Window;
