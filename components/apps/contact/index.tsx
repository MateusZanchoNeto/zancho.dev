"use client";

import React from "react";
import { useContactForm } from "./useContactForm";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const Contact: React.FC = () => {
    const { formData, status, responseMessage, handleChange, handleSubmit } =
        useContactForm();

    return (
        <div className="w-full bg-gray-800 p-6 flex flex-col md:flex-row gap-8 text-gray-200 rounded-xl">
            <ContactInfo />
            <ContactForm
                formData={formData}
                status={status}
                responseMessage={responseMessage}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Contact;
