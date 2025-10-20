"use client";

import React from "react";
import { useNotes } from "./useNotes";
import NoteSidebar from "./NoteSidebar";
import NoteEditor from "./NoteEditor";

const Notes: React.FC = () => {
    const {
        filteredNotes,
        selectedNote,
        addNote,
        deleteNote,
        saveNote,
        selectNote,
        setSearchTerm,
    } = useNotes();

    return (
        <div className="w-full h-full bg-gray-800 flex flex-col md:flex-row relative rounded-xl">
            <NoteSidebar
                notes={filteredNotes}
                activeNoteId={selectedNote?.id || null}
                onAddNote={addNote}
                onDeleteNote={deleteNote}
                onSelectNote={selectNote}
                onSearchChange={setSearchTerm}
            />
            <NoteEditor note={selectedNote} onSave={saveNote} />
        </div>
    );
};

export default Notes;
