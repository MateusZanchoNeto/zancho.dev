"use client";

import React, { useRef } from "react";
import { FileRecord } from "@/lib/db";
import { Upload } from "lucide-react";
import FileItem from "./FileItem";

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
    return (
        <div className="flex-1 flex flex-col bg-gray-800/50 rounded-r-xl">
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
                            <FileItem key={file.id} file={file} onDelete={onDelete} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default FileView;
