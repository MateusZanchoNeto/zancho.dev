import React from "react";

interface Props {
    value: string;
    onClick: () => void;
}

const ImageSwatch: React.FC<Props> = ({ value, onClick }) => (
    <button
        onClick={onClick}
        className="w-24 h-16 bg-cover bg-center rounded border-2 border-transparent hover:border-green-500 focus:outline-none focus:border-green-500"
        style={{ backgroundImage: value }}
    />
);

export default ImageSwatch;
