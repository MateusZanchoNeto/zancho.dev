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
} from "@/lib/redux/slices/windowsSlice";
import { X } from "lucide-react";

interface WindowProps {
    id: string;
    title: string;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
    id,
    title,
    zIndex,
    position,
    size,
    children,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const nodeRef = useRef(null);

    const handleClose = () => {
        dispatch(closeWindow(id));
    };

    const handleFocus = () => {
        dispatch(focusWindow(id));
    };

    const handleDragStop = (_e: any, data: any) => {
        dispatch(updateWindowPosition({ id, position: { x: data.x, y: data.y } }));
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".handle"
            defaultPosition={position}
            onStart={handleFocus}
            onStop={handleDragStop}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                className="absolute min-w-[300px] bg-gray-900/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl flex flex-col"
                style={{
                    zIndex,
                    width: `${size.width}px`,
                    minHeight: `${size.height}px`,
                    maxHeight: "calc(100vh - 7rem)",
                }}
                onMouseDown={handleFocus}
            >
                <div className="handle h-8 bg-black/30 flex items-center justify-between px-2 cursor-move rounded-t-lg flex-shrink-0">
                    <span className="font-mono text-xs text-gray-300">{title}</span>
                    <button
                        onClick={handleClose}
                        className="p-1 rounded-full hover:bg-red-500 text-gray-300 hover:text-white"
                    >
                        <X size={16} />
                    </button>
                </div>

                <div className="flex-grow p-4 overflow-auto text-gray-200">
                    {children}
                </div>
            </div>
        </Draggable>
    );
};

export default Window;
