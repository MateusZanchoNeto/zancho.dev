import React from "react";

interface Props {
    value: string;
    onClick: () => void;
}

const ColorSwatch: React.FC<Props> = ({ value, onClick }) => (
    <button
        onClick={onClick}
        className="w-12 h-12 rounded border-2 border-transparent hover:border-green-500 focus:outline-none focus:border-green-500"
        style={{ backgroundColor: value }}
    />
);

export default ColorSwatch;
