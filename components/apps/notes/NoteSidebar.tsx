"use client";
import React from "react";
import { Note } from "./useNotes";
import NoteItem from "./NoteItem";
import { Search, Plus } from "lucide-react";

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
}) => (
    <div className="w-full md:w-1/4 md:min-w-[200px] h-auto md:h-full bg-gray-900/50 p-2 flex flex-col border-b border-white/10 md:border-b-0 md:border-r flex-shrink-0 rounded-t-xl md:rounded-t-none md:rounded-l-xl">
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
                <NoteItem
                    key={note.id}
                    note={note}
                    isActive={note.id === activeNoteId}
                    onSelect={() => onSelectNote(note.id)}
                    onDelete={() => onDeleteNote(note.id)}
                />
            ))}
        </div>
    </div>
);

export default NoteSidebar;
