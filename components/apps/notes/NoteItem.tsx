import React from "react";
import { Note } from "./useNotes";
import { Trash2 } from "lucide-react";

interface Props {
    note: Note;
    isActive: boolean;
    onSelect: () => void;
    onDelete: () => void;
}

const NoteItem: React.FC<Props> = ({ note, isActive, onSelect, onDelete }) => (
    <div
        onClick={onSelect}
        className={`p-3 cursor-pointer border-b border-white/5 ${isActive ? "bg-green-800/50" : "hover:bg-white/5"} rounded-l-xl`}
    >
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-sm truncate">
                {note.title || "Untitled Note"}
            </h3>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
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
);

export default NoteItem;
