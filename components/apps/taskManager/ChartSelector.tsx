import React from "react";

type ChartType = "bar" | "radial" | "line";

interface Props {
    selected: ChartType;
    onChange: (type: ChartType) => void;
}

const ChartSelector: React.FC<Props> = ({ selected, onChange }) => {
    const types: ChartType[] = ["bar", "radial", "line"];
    const baseStyle = "px-2 py-0.5 text-xs rounded-md";
    const activeStyle = "bg-green-500 text-black";
    const inactiveStyle = "bg-gray-600 hover:bg-gray-500 text-white";

    return (
        <div className="flex space-x-1">
            {types.map((type) => (
                <button
                    key={type}
                    onClick={() => onChange(type)}
                    className={`${baseStyle} ${selected === type ? activeStyle : inactiveStyle}`}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default ChartSelector;
