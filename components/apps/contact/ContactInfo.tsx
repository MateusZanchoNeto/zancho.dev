import React from "react";
import { contactLinks, ContactLink } from "./contactData";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const ContactInfoItem = ({
    link,
    accentColor,
}: {
    link: ContactLink;
    accentColor: string;
}) => (
    <li className="flex items-center gap-3">
        <span className={accentColor}>{link.icon}</span>
        <a
            href={link.href}
            target={link.isExternal ? "_blank" : undefined}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
            className="hover:underline"
        >
            {link.label}
        </a>
    </li>
);

const ContactInfo = () => {
    const settings = useSelector((state: RootState) => state.settings);
    const accentColor =
        settings.theme === "matrix" ? "text-green-400" : "text-cyan-400";

    return (
        <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <ul className="space-y-4">
                {contactLinks.map((link) => (
                    <ContactInfoItem
                        key={link.href}
                        link={link}
                        accentColor={accentColor}
                    />
                ))}
            </ul>
        </div>
    );
};

export default ContactInfo;
