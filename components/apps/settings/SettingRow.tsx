import React from "react";

const SettingRow = ({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) => (
    <div className="flex items-center justify-between py-2">
        <label>{label}</label>
        {children}
    </div>
);

export default SettingRow;
