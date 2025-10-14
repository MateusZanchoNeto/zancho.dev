import { useState, useMemo } from "react";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

export interface Note {
    id: string;
    title: string;
    content: string;
    lastModified: number;
}

export function useNotes() {
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

    const selectedNote = useMemo(
        () => allNotes.find((note) => note.id === selectedNoteId) || null,
        [allNotes, selectedNoteId],
    );

    const filteredNotes = useMemo(
        () =>
            allNotes.filter((note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [allNotes, searchTerm],
    );

    return {
        filteredNotes,
        selectedNote,
        searchTerm,

        addNote: handleAddNote,
        deleteNote: handleDeleteNote,
        saveNote: handleSaveNote,
        selectNote: setSelectedNoteId,
        setSearchTerm,
    };
}
