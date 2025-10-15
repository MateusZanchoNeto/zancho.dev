"use client";

import React, { useState, useEffect } from "react";
import { Note } from "./useNotes";

interface Props {
    note: Note | null;
    onSave: (note: Note) => void;
}

const NoteEditor: React.FC<Props> = ({ note, onSave }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        setTitle(note?.title || "");
        setContent(note?.content || "");
    }, [note]);

    if (!note) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a note to edit or create a new one.
            </div>
        );
    }

    const handleSave = () => {
        onSave({ ...note, title, content });
    };

    return (
        <div className="flex-1 flex flex-col p-4 bg-gray-800/50 rounded-r-xl">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full bg-transparent text-2xl font-bold focus:outline-none"
                />
                <span className="text-xs text-gray-400">
                    {new Date(note.lastModified).toLocaleDateString()}
                </span>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your note..."
                className="w-full h-[300px] bg-transparent text-gray-300 focus:outline-none resize-none"
            />
            <button
                onClick={handleSave}
                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg self-end"
            >
                Save Note
            </button>
        </div>
    );
};

export default NoteEditor;
