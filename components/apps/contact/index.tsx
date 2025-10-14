"use client";

import React, { useState } from "react";
import { Mail, Phone, Send, Linkedin } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<FormStatus>("idle");
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            setResponseMessage(result.message || result.error);

            if (!response.ok) {
                throw new Error(result.error || "Something went wrong");
            }

            setStatus("success");
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            setStatus("error");
            console.error(error);
        }
    };

    return (
        <div className="w-full h-full bg-gray-800 p-6 flex flex-col md:flex-row gap-8 text-gray-200 rounded-xl">
            <div className="md:w-1/3">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                        <Mail size={18} className="text-green-400" />
                        <a href="mailto:mateuszancho@gmail.com" className="hover:underline">
                            mateuszancho@gmail.com
                        </a>
                    </li>
                    <li className="flex items-center gap-3">
                        <Phone size={18} className="text-green-400" />
                        <a href="tel:+5544997395469" className="hover:underline">
                            +55 44 99739-5469
                        </a>
                    </li>
                    <li className="flex items-center gap-3">
                        <Send size={18} className="text-green-400" />
                        <a
                            href="https://t.me/MateusZanchoNeto"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            @MateusZanchoNeto
                        </a>
                    </li>
                    <li className="flex items-center gap-3">
                        <Linkedin size={18} className="text-green-400" />
                        <a
                            href="https://www.linkedin.com/in/mateus-zancho-neto-full-stack-react/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                        >
                            LinkedIn Profile
                        </a>
                    </li>
                </ul>
            </div>

            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="flex-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="flex-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    />
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md disabled:bg-gray-500 disabled:cursor-wait"
                    >
                        {status === "sending" ? "Sending..." : "Send Message"}
                    </button>
                    {responseMessage && (
                        <p
                            className={`mt-2 text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}
                        >
                            {responseMessage}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Contact;
