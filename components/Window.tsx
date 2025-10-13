/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
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
    const { window: windowSettings, windowControls } = useSelector(
        (state: RootState) => state.settings,
    );

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

    const buttonSizeClasses = { sm: "p-1", md: "p-1.5", lg: "p-2" };
    const buttonStyleClasses = {
        circle: "rounded-full",
        square: "",
        rounded: "rounded-md",
    };
    const titleBarColorClasses = {
        dark: "bg-black/30",
        light: "bg-gray-400/30",
        gradient: "bg-gradient-to-r from-green-500/50 to-cyan-500/50",
    };
    const iconSizeMap = { sm: 12, md: 14, lg: 16 };
    const squareIconSizeMap = { sm: 10, md: 12, lg: 14 };

    const baseClasses = `
    absolute flex flex-col shadow-2xl border border-white/20
    ${windowSettings.blur ? "backdrop-blur-lg" : ""}
    ${windowSettings.rounded ? "rounded-xl" : ""}
  `;

    const dynamicWindowStyles: React.CSSProperties = {
        zIndex,
        backgroundColor: `rgba(17, 24, 39, ${windowSettings.opacity / 100})`,
    };

    const windowContent = (
        <>
            <div
                className={`handle h-8 flex items-center justify-between px-2 cursor-move flex-shrink-0 ${titleBarColorClasses[windowControls.titleBarColor]} ${windowSettings.rounded ? "rounded-t-xl" : ""}`}
            >
                <span className="font-mono text-xs text-gray-300">{title}</span>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={handleMinimize}
                        className={`${buttonSizeClasses[windowControls.buttonSize]} ${buttonStyleClasses[windowControls.buttonStyle]} hover:bg-yellow-500/80`}
                    >
                        <Minus size={iconSizeMap[windowControls.buttonSize]} />
                    </button>
                    <button
                        onClick={handleFullscreen}
                        className={`${buttonSizeClasses[windowControls.buttonSize]} ${buttonStyleClasses[windowControls.buttonStyle]} hover:bg-green-500/80`}
                    >
                        <Square size={squareIconSizeMap[windowControls.buttonSize]} />
                    </button>
                    <button
                        onClick={handleClose}
                        className={`${buttonSizeClasses[windowControls.buttonSize]} ${buttonStyleClasses[windowControls.buttonStyle]} hover:bg-red-500/80`}
                    >
                        <X size={iconSizeMap[windowControls.buttonSize]} />
                    </button>
                </div>
            </div>
            <div
                className={`flex-grow p-4 overflow-auto text-gray-200 ${windowSettings.rounded ? "rounded-b-xl" : ""}`}
                style={dynamicWindowStyles}
            >
                {children}
            </div>
        </>
    );

    if (isFullscreen) {
        return (
            <div
                className={`${baseClasses} top-0 left-0 w-full h-full`}
                style={dynamicWindowStyles}
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
                className={`${baseClasses} min-w-[300px]`}
                style={{
                    zIndex,
                    width: `${size.width}px`,
                    minHeight: `${size.height}px`,
                    maxHeight: "calc(100vh - 9rem)",
                }}
                onMouseDown={handleFocus}
            >
                {windowContent}
            </div>
        </Draggable>
    );
};

export default Window;
