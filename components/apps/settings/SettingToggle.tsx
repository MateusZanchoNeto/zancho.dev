import React from "react";

interface Props {
    checked: boolean;
    onChange: () => void;
}

const SettingToggle: React.FC<Props> = ({ checked, onChange }) => (
    <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="toggle"
    />
);

export default SettingToggle;
