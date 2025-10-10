"use client";

import React, { useRef } from "react";
import { FileRecord } from "@/lib/db";
import { Upload, Download, Trash2, File as FileIcon } from "lucide-react";

interface Props {
    folderName: string;
    files: FileRecord[];
    onUpload: (files: FileList) => void;
    onDelete: (id: number) => void;
}

const FileView: React.FC<Props> = ({
    folderName,
    files,
    onUpload,
    onDelete,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDownload = (file: FileRecord) => {
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
        <div className="flex-1 flex flex-col bg-gray-800/50 min-h-[550px] rounded-xl">
            <header className="p-3 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-bold">{folderName}</h2>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-500 text-sm rounded-md"
                >
                    <Upload size={16} /> Upload
                </button>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={(e) => e.target.files && onUpload(e.target.files)}
                    className="hidden"
                />
            </header>

            <main className="flex-1 p-4 overflow-y-auto">
                {files.length === 0 ? (
                    <div className="text-gray-500 text-center mt-10">
                        This folder is empty.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="bg-gray-700/50 p-2 rounded-lg flex flex-col items-center text-center"
                            >
                                <FileIcon size={48} className="text-green-400 mb-2" />
                                <span className="text-xs break-all w-full truncate mb-2">
                                    {file.name}
                                </span>
                                <div className="flex gap-2 mt-auto">
                                    <button
                                        onClick={() => handleDownload(file)}
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
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default FileView;
