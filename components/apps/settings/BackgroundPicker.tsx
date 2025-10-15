import React from "react";
import { backgroundOptions } from "./settingsData";
import ImageSwatch from "./ImageSwatch";
import ColorSwatch from "./ColorSwatch";

interface Props {
    onSelectImage: (value: string) => void;
    onSelectColor: (value: string) => void;
}

const BackgroundPicker: React.FC<Props> = ({
    onSelectImage,
    onSelectColor,
}) => (
    <div>
        <h4 className="text-sm font-bold mb-2">Images</h4>
        <div className="flex gap-2">
            {backgroundOptions.images.map((bg) => (
                <ImageSwatch
                    key={bg.name}
                    value={bg.value}
                    onClick={() => onSelectImage(bg.value)}
                />
            ))}
        </div>
        <h4 className="text-sm font-bold mt-4 mb-2">Solid Colors</h4>
        <div className="flex gap-2">
            {backgroundOptions.colors.map((bg) => (
                <ColorSwatch
                    key={bg.name}
                    value={bg.value}
                    onClick={() => onSelectColor(bg.value)}
                />
            ))}
        </div>
    </div>
);

export default BackgroundPicker;
