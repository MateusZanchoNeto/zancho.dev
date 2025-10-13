"use client";

import React from "react";
import { Note } from "./";
import { Search, Plus, Trash2 } from "lucide-react";

interface Props {
    notes: Note[];
    activeNoteId: string | null;
    onAddNote: () => void;
    onDeleteNote: (id: string) => void;
    onSelectNote: (id: string) => void;
    onSearchChange: (query: string) => void;
}

const NoteSidebar: React.FC<Props> = ({
    notes,
    activeNoteId,
    onAddNote,
    onDeleteNote,
    onSelectNote,
    onSearchChange,
}) => {
    return (
        <div className="w-1/3 min-w-[250px] bg-gray-900/50 flex flex-col border-r border-white/10">
            <div className="p-2 flex items-center border-b border-white/10">
                <Search size={18} className="text-gray-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search notes..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-sm"
                />
                <button
                    onClick={onAddNote}
                    className="p-2 hover:bg-white/10 rounded-full"
                >
                    <Plus size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => onSelectNote(note.id)}
                        className={`p-3 cursor-pointer border-b border-white/5 ${activeNoteId === note.id ? "bg-green-800/50" : "hover:bg-white/5"}`}
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-sm truncate">
                                {note.title || "Untitled Note"}
                            </h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteNote(note.id);
                                }}
                                className="p-1 rounded-full hover:bg-red-500/50 text-gray-400 hover:text-white"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            {new Date(note.lastModified).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NoteSidebar;
