import { Mail, Phone, Send, Linkedin } from "lucide-react";
import React from "react";

export interface ContactLink {
    icon: React.ReactNode;
    label: string;
    href: string;
    isExternal?: boolean;
}

export const contactLinks: ContactLink[] = [
    {
        icon: <Mail size={18} />,
        label: "mateuszancho@gmail.com",
        href: "mailto:mateuszancho@gmail.com",
    },
    {
        icon: <Phone size={18} />,
        label: "+55 44 99739-5469",
        href: "tel:+5544997395469",
    },
    {
        icon: <Send size={18} />,
        label: "@MateusZanchoNeto",
        href: "https://t.me/MateusZanchoNeto",
        isExternal: true,
    },
    {
        icon: <Linkedin size={18} />,
        label: "LinkedIn Profile",
        href: "https://www.linkedin.com/in/mateus-zancho-neto-full-stack-react/",
        isExternal: true,
    },
];
