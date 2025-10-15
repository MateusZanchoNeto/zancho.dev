"use client";

import React from "react";
import {
    ThemeSettings,
    DesktopSettings,
    WindowSettings,
    AdvancedSettings,
} from "./SettingsSections";

const Settings: React.FC = () => {
    return (
        <div className="w-full h-full bg-gray-800 p-4 text-gray-200 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <ThemeSettings />
            <DesktopSettings />
            <WindowSettings />
            <AdvancedSettings />
        </div>
    );
};

export default Settings;
