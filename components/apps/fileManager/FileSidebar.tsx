/* eslint-disable jsx-a11y/alt-text */
"use client";

import React from "react";
import {
    Search,
    Home,
    Clock,
    Network,
    Trash2,
    FileText,
    Music,
    Image,
    Video,
    Download,
} from "lucide-react";

const folders = {
    system: [
        { id: "Home", label: "Home", icon: <Home size={18} /> },
        { id: "Recent", label: "Recent", icon: <Clock size={18} /> },
        { id: "Network", label: "Network", icon: <Network size={18} /> },
        { id: "Trash", label: "Trash", icon: <Trash2 size={18} /> },
    ],
    user: [
        { id: "Documents", label: "Documents", icon: <FileText size={18} /> },
        { id: "Music", label: "Music", icon: <Music size={18} /> },
        { id: "Pictures", label: "Pictures", icon: <Image size={18} /> },
        { id: "Videos", label: "Videos", icon: <Video size={18} /> },
        { id: "Downloads", label: "Downloads", icon: <Download size={18} /> },
    ],
};

interface Props {
    activeFolder: string;
    onFolderChange: (folder: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
    isSearchActive: boolean;
}

const FileSidebar: React.FC<Props> = ({
    activeFolder,
    onFolderChange,
    searchTerm,
    onSearchChange,
    isSearchActive,
}) => {
    const baseStyle =
        "flex items-center w-full text-left p-2 rounded-md text-sm text-gray-300";
    const activeStyle = "bg-green-700/60 text-white";
    const inactiveStyle = "hover:bg-white/10";

    return (
        <div className="w-1/4 min-w-[200px] bg-gray-900/50 p-2 flex flex-col border-r border-white/10">
            <div className="relative mb-2">
                <Search
                    size={16}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    placeholder="Search all files..."
                    className="w-full bg-black/30 rounded-md pl-8 pr-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <nav className="flex flex-col gap-1">
                <hr className="border-white/10 my-2" />
                {folders.user.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => onFolderChange(f.id)}
                        className={`${baseStyle} ${!isSearchActive && activeFolder === f.id ? activeStyle : inactiveStyle}`}
                    >
                        {f.icon}
                        <span className="ml-2">{f.label}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default FileSidebar;
