"use client";
import React from "react";
import { FileRecord } from "@/lib/db";
import { Download, Trash2, File as FileIcon } from "lucide-react";

interface Props {
    file: FileRecord;
    onDelete: (id: number) => void;
}

const FileItem: React.FC<Props> = ({ file, onDelete }) => {
    const handleDownload = () => {
        const url = URL.createObjectURL(file.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-gray-700/50 p-2 rounded-lg flex flex-col items-center text-center">
            <FileIcon size={48} className="text-green-400 mb-2" />
            <span className="text-xs break-all w-full truncate mb-2">
                {file.name}
            </span>
            <div className="flex gap-2 mt-auto">
                <button
                    onClick={handleDownload}
                    className="p-1.5 hover:bg-white/10 rounded-full"
                >
                    <Download size={14} />
                </button>
                <button
                    onClick={() => onDelete(file.id!)}
                    className="p-1.5 text-red-400 hover:bg-red-500/20 rounded-full"
                >
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
};
export default FileItem;
