/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import {
    setDesktopBackground,
    setWindowOpacity,
    toggleWindowBlur,
    toggleWindowRounded,
    setControlButtonSize,
    setControlButtonStyle,
    setTitleBarColor,
    toggleDesktopBlur,
} from "@/lib/redux/slices/settingsSlice";

const backgrounds = {
    images: [
        { name: "Default GIF", value: 'url("/matrix-bg.gif")' },
        {
            name: "Mountains",
            value: 'url("/mountains-bg.jpg")',
        },
        {
            name: "Abstract",
            value: 'url("abstract-bg.jpg")',
        },
    ],
    colors: [
        { name: "Gray", value: "#374151" },
        { name: "Zinc", value: "#3f3f46" },
        { name: "Stone", value: "#44403c" },
        { name: "Teal", value: "#134e4a" },
    ],
};

const Settings: React.FC = () => {
    const settings = useSelector((state: RootState) => state.settings);
    const dispatch = useDispatch<AppDispatch>();

    const renderSection = (title: string, children: React.ReactNode) => (
        <div className="mb-6">
            <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-3">
                {title}
            </h3>
            {children}
        </div>
    );

    return (
        <div className="w-full h-full bg-gray-800 p-4 text-gray-200 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>

            {renderSection(
                "Desktop Background",
                <div>
                    <h4 className="text-sm font-bold mb-2">Images</h4>
                    <div className="flex gap-2">
                        {backgrounds.images.map((bg) => (
                            <button
                                key={bg.name}
                                onClick={() =>
                                    dispatch(
                                        setDesktopBackground({ type: "image", value: bg.value }),
                                    )
                                }
                                className="w-24 h-16 bg-cover bg-center rounded border-2 border-transparent hover:border-green-500"
                                style={{ backgroundImage: bg.value }}
                            />
                        ))}
                    </div>
                    <h4 className="text-sm font-bold mt-4 mb-2">Solid Colors</h4>
                    <div className="flex gap-2">
                        {backgrounds.colors.map((bg) => (
                            <button
                                key={bg.name}
                                onClick={() =>
                                    dispatch(
                                        setDesktopBackground({ type: "color", value: bg.value }),
                                    )
                                }
                                className="w-12 h-12 rounded border-2 border-transparent hover:border-green-500"
                                style={{ backgroundColor: bg.value }}
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <label>Enable background blur</label>
                        <input
                            type="checkbox"
                            checked={settings.desktopBackground.blur}
                            onChange={() => dispatch(toggleDesktopBlur())}
                            className="toggle"
                        />
                    </div>
                </div>,
            )}

            {renderSection(
                "Window Settings",
                <div className="space-y-4">
                    <div>
                        <label>Window Opacity ({settings.window.opacity}%)</label>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            value={settings.window.opacity}
                            onChange={(e) =>
                                dispatch(setWindowOpacity(Number(e.target.value)))
                            }
                            className="w-full"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label>Enable blur effect</label>
                        <input
                            type="checkbox"
                            checked={settings.window.blur}
                            onChange={() => dispatch(toggleWindowBlur())}
                            className="toggle"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <label>Enable rounded corners</label>
                        <input
                            type="checkbox"
                            checked={settings.window.rounded}
                            onChange={() => dispatch(toggleWindowRounded())}
                            className="toggle"
                        />
                    </div>
                </div>,
            )}

            {renderSection(
                "Advanced",
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label>Button Size</label>
                        <select
                            value={settings.windowControls.buttonSize}
                            onChange={(e) =>
                                dispatch(setControlButtonSize(e.target.value as any))
                            }
                            className="bg-gray-700 p-1 rounded"
                        >
                            <option value="sm">Small</option>
                            <option value="md">Medium</option>
                            <option value="lg">Large</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <label>Button Style</label>
                        <select
                            value={settings.windowControls.buttonStyle}
                            onChange={(e) =>
                                dispatch(setControlButtonStyle(e.target.value as any))
                            }
                            className="bg-gray-700 p-1 rounded"
                        >
                            <option value="circle">Circle</option>
                            <option value="square">Square</option>
                            <option value="rounded">Rounded</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <label>Title Bar Color</label>
                        <select
                            value={settings.windowControls.titleBarColor}
                            onChange={(e) =>
                                dispatch(setTitleBarColor(e.target.value as any))
                            }
                            className="bg-gray-700 p-1 rounded"
                        >
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                            <option value="gradient">Gradient</option>
                        </select>
                    </div>
                </div>,
            )}
        </div>
    );
};

export default Settings;
