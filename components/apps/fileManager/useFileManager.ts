import { useState } from "react";
import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import useDebounce from "@/lib/hooks/useDebounce";

export function useFileManager() {
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
        if (isSearching) {
            setToastMessage("Cannot upload files while in search view.");
            setTimeout(() => setToastMessage(null), 3000);
            return;
        }
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

    const handleDeleteRequest = (id: number) => setFileToDelete(id);
    const handleCancelDelete = () => setFileToDelete(null);

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

    return {
        activeFolder,
        searchTerm,
        isSearching,
        filesToDisplay: filesToDisplay || [],
        viewTitle,
        toastMessage,
        isDeleteModalOpen: fileToDelete !== null,

        setSearchTerm,
        handleFolderChange,
        handleUpload,
        handleDeleteRequest,
        executeDelete,
        handleCancelDelete,
        clearToast: () => setToastMessage(null),
    };
}
