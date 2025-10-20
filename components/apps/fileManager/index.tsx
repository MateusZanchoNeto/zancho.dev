"use client";

import React from "react";
import FileSidebar from "./FileSidebar";
import FileView from "./FileView";
import ConfirmModal from "@/components/common/ConfirmModal";
import Toast from "@/components/common/Toast";
import { useFileManager } from "./useFileManager";

const FileManager: React.FC = () => {
    const {
        activeFolder,
        searchTerm,
        isSearching,
        filesToDisplay,
        viewTitle,
        toastMessage,
        isDeleteModalOpen,
        setSearchTerm,
        handleFolderChange,
        handleUpload,
        handleDeleteRequest,
        executeDelete,
        handleCancelDelete,
        clearToast,
    } = useFileManager();

    return (
        <div className="w-full h-full bg-gray-800 flex flex-col md:flex-row relative rounded-xl">
            <FileSidebar
                activeFolder={activeFolder}
                onFolderChange={handleFolderChange}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                isSearchActive={isSearching}
            />
            <FileView
                folderName={viewTitle}
                files={filesToDisplay}
                onUpload={handleUpload}
                onDelete={handleDeleteRequest}
            />

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Delete File"
                message="Are you sure you want to permanently delete this file? This action cannot be undone."
                onConfirm={executeDelete}
                onCancel={handleCancelDelete}
            />

            {toastMessage && <Toast message={toastMessage} onClose={clearToast} />}
        </div>
    );
};

export default FileManager;
