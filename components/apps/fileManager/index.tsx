"use client";

import React, { useState } from "react";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import FileSidebar from "./FileSidebar";
import FileView from "./FileView";
import ConfirmModal from "@/components/common/ConfirmModal";
import Toast from "@/components/common/Toast";
import useDebounce from "@/lib/hooks/useDebounce";

const FileManager: React.FC = () => {
    const [activeFolder, setActiveFolder] = useState("Documents");
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [fileToDelete, setFileToDelete] = useState<number | null>(null);

    const folderFiles = useLiveQuery(
        () => db.files.where("folder").equals(activeFolder).toArray(),
        [activeFolder],
    );

    const searchResults = useLiveQuery(() => {
        if (!debouncedSearchTerm) return [];
        return db.files
            .where("name")
            .startsWithIgnoreCase(debouncedSearchTerm)
            .toArray();
    }, [debouncedSearchTerm]);

    const isSearching = debouncedSearchTerm.length > 0;
    const filesToDisplay = isSearching ? searchResults : folderFiles;
    const viewTitle = isSearching
        ? `Search results for "${debouncedSearchTerm}"`
        : activeFolder;

    const handleFolderChange = (folder: string) => {
        setSearchTerm("");
        setActiveFolder(folder);
    };

    const handleUpload = async (fileList: FileList) => {
        try {
            await db.files.bulkAdd(
                Array.from(fileList).map((file) => ({
                    name: file.name,
                    type: file.type,
                    data: file,
                    folder: activeFolder,
                    createdAt: new Date(),
                })),
            );
            setToastMessage(`${fileList.length} file(s) uploaded successfully!`);
        } catch (error) {
            console.error("Failed to upload files:", error);
        }
    };

    const handleDeleteRequest = (id: number) => {
        setFileToDelete(id);
    };

    const executeDelete = async () => {
        if (fileToDelete === null) return;
        try {
            await db.files.delete(fileToDelete);
        } catch (error) {
            console.error("Failed to delete file:", error);
        } finally {
            setFileToDelete(null);
        }
    };

    return (
        <div className="w-full h-full bg-gray-800 flex relative rounded-xl">
            <FileSidebar
                activeFolder={activeFolder}
                onFolderChange={handleFolderChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isSearchActive={isSearching}
            />
            <FileView
                folderName={viewTitle}
                files={filesToDisplay || []}
                onUpload={handleUpload}
                onDelete={handleDeleteRequest}
            />

            <ConfirmModal
                isOpen={fileToDelete !== null}
                title="Delete File"
                message="Are you sure you want to permanently delete this file? This action cannot be undone."
                onConfirm={executeDelete}
                onCancel={() => setFileToDelete(null)}
            />

            {toastMessage && (
                <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
            )}
        </div>
    );
};

export default FileManager;
