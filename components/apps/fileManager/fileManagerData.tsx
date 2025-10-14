/* eslint-disable jsx-a11y/alt-text */
import { FileText, Music, Image, Video, Download } from "lucide-react";
import React from "react";

export const userFolders = [
    { id: "Documents", label: "Documents", icon: <FileText size={18} /> },
    { id: "Music", label: "Music", icon: <Music size={18} /> },
    { id: "Pictures", label: "Pictures", icon: <Image size={18} /> },
    { id: "Videos", label: "Videos", icon: <Video size={18} /> },
    { id: "Downloads", label: "Downloads", icon: <Download size={18} /> },
];
