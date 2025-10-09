"use client";

import React, { useState, useMemo } from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import NoteSidebar from "./NoteSidebar";
import NoteEditor from "./NoteEditor";

export interface Note {
    id: string;
    title: string;
    content: string;
    lastModified: number;
}

const Notes: React.FC = () => {
    const [allNotes, setAllNotes] = useLocalStorage<Note[]>("desktop-notes", []);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAddNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "New Note",
            content: "",
            lastModified: Date.now(),
        };
        setAllNotes([newNote, ...allNotes]);
        setSelectedNoteId(newNote.id);
    };

    const handleDeleteNote = (id: string) => {
        setAllNotes(allNotes.filter((note) => note.id !== id));
        if (selectedNoteId === id) {
            setSelectedNoteId(null);
        }
    };

    const handleSaveNote = (updatedNote: Note) => {
        const updatedNotes = allNotes.map((note) =>
            note.id === updatedNote.id
                ? { ...updatedNote, lastModified: Date.now() }
                : note,
        );
        setAllNotes(updatedNotes.sort((a, b) => b.lastModified - a.lastModified));
    };

    const selectedNote =
        allNotes.find((note) => note.id === selectedNoteId) || null;
    const filteredNotes = useMemo(
        () =>
            allNotes.filter((note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [allNotes, searchTerm],
    );

    return (
        <div className="w-full h-full bg-gray-800 flex">
            <NoteSidebar
                notes={filteredNotes}
                activeNoteId={selectedNoteId}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
                onSelectNote={setSelectedNoteId}
                onSearchChange={setSearchTerm}
            />
            <NoteEditor note={selectedNote} onSave={handleSaveNote} />
        </div>
    );
};

export default Notes;
