"use client";

import React from "react";
import { Search } from "lucide-react";
import { userFolders } from "./fileManagerData";

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
        <div className="w-full md:w-1/4 md:min-w-[200px] h-auto md:h-full bg-gray-900/50 p-2 flex flex-col border-b border-white/10 md:border-b-0 md:border-r flex-shrink-0 rounded-t-xl md:rounded-t-none md:rounded-l-xl">
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
                {userFolders.map((f) => (
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
