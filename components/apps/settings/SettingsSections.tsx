import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import * as settingsActions from "@/lib/redux/slices/settingsSlice";
import {
    themeOptions,
    buttonSizeOptions,
    buttonStyleOptions,
    titleBarColorOptions,
} from "./settingsData";
import SettingRow from "./SettingRow";
import SettingSelect from "./SettingSelect";
import SettingToggle from "./SettingToggle";
import BackgroundPicker from "./BackgroundPicker";

const Section = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold border-b border-white/10 pb-2 mb-1">
            {title}
        </h3>
        {children}
    </div>
);

export const ThemeSettings = () => {
    const theme = useSelector((state: RootState) => state.settings.theme);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Section title="Theme">
            <SettingRow label="Select a global theme">
                <SettingSelect
                    value={theme}
                    onChange={(v) => dispatch(settingsActions.setTheme(v))}
                    options={themeOptions}
                />
            </SettingRow>
        </Section>
    );
};

export const DesktopSettings = () => {
    const { blur } = useSelector(
        (state: RootState) => state.settings.desktopBackground,
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleSelectImage = (value: string) => {
        dispatch(settingsActions.setDesktopBackground({ type: "image", value }));
    };

    const handleSelectColor = (value: string) => {
        dispatch(settingsActions.setDesktopBackground({ type: "color", value }));
    };

    return (
        <Section title="Desktop Background">
            <BackgroundPicker
                onSelectImage={handleSelectImage}
                onSelectColor={handleSelectColor}
            />
            <SettingRow label="Enable background blur">
                <SettingToggle
                    checked={blur}
                    onChange={() => dispatch(settingsActions.toggleDesktopBlur())}
                />
            </SettingRow>
        </Section>
    );
};

export const WindowSettings = () => {
    const { opacity, blur, rounded } = useSelector(
        (state: RootState) => state.settings.window,
    );
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Section title="Window Settings">
            <SettingRow label={`Window Opacity (${opacity}%)`}>
                <input
                    type="range"
                    min="20"
                    max="100"
                    value={opacity}
                    onChange={(e) =>
                        dispatch(settingsActions.setWindowOpacity(Number(e.target.value)))
                    }
                    className="w-1/2"
                />
            </SettingRow>
            <SettingRow label="Enable blur effect">
                <SettingToggle
                    checked={blur}
                    onChange={() => dispatch(settingsActions.toggleWindowBlur())}
                />
            </SettingRow>
            <SettingRow label="Enable rounded corners">
                <SettingToggle
                    checked={rounded}
                    onChange={() => dispatch(settingsActions.toggleWindowRounded())}
                />
            </SettingRow>
        </Section>
    );
};

export const AdvancedSettings = () => {
    const controls = useSelector(
        (state: RootState) => state.settings.windowControls,
    );
    const dispatch = useDispatch<AppDispatch>();
    return (
        <Section title="Advanced">
            <SettingRow label="Button Size">
                <SettingSelect
                    value={controls.buttonSize}
                    onChange={(v) => dispatch(settingsActions.setControlButtonSize(v))}
                    options={buttonSizeOptions}
                />
            </SettingRow>
            <SettingRow label="Button Style">
                <SettingSelect
                    value={controls.buttonStyle}
                    onChange={(v) => dispatch(settingsActions.setControlButtonStyle(v))}
                    options={buttonStyleOptions}
                />
            </SettingRow>
            <SettingRow label="Title Bar Color">
                <SettingSelect
                    value={controls.titleBarColor}
                    onChange={(v) => dispatch(settingsActions.setTitleBarColor(v))}
                    options={titleBarColorOptions}
                />
            </SettingRow>
        </Section>
    );
};
