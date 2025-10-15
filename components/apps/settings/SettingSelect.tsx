import React from "react";

interface Props<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: { value: T; label: string }[];
}

const SettingSelect = <T extends string>({
    value,
    onChange,
    options,
}: Props<T>) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="bg-gray-700 p-1 rounded"
    >
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
        ))}
    </select>
);

export default SettingSelect;
