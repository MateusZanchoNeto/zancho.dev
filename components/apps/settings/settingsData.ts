import { SettingsState } from "@/lib/redux/slices/settingsSlice";

export const backgroundOptions = {
    images: [
        { name: "Matrix", value: 'url("/matrix-bg.gif")' },
        { name: "Mountains", value: 'url("/mountains-bg.jpg")' },
        { name: "Abstract", value: 'url("/abstract-bg.jpg")' },
    ],
    colors: [
        { name: "Gray", value: "#374151" },
        { name: "Zinc", value: "#3f3f46" },
        { name: "Stone", value: "#44403c" },
        { name: "Teal", value: "#134e4a" },
    ],
};

export const themeOptions: { value: SettingsState["theme"]; label: string }[] =
    [
        { value: "default", label: "Default" },
        { value: "matrix", label: "Matrix" },
    ];

export const buttonSizeOptions: {
    value: SettingsState["windowControls"]["buttonSize"];
    label: string;
}[] = [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" },
    ];

export const buttonStyleOptions: {
    value: SettingsState["windowControls"]["buttonStyle"];
    label: string;
}[] = [
        { value: "circle", label: "Circle" },
        { value: "square", label: "Square" },
        { value: "rounded", label: "Rounded" },
    ];

export const titleBarColorOptions: {
    value: SettingsState["windowControls"]["titleBarColor"];
    label: string;
}[] = [
        { value: "dark", label: "Dark" },
        { value: "light", label: "Light" },
        { value: "gradient", label: "Gradient" },
    ];
