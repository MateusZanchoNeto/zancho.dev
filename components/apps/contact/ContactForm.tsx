import React from "react";
import { FormData } from "./useContactForm";

interface Props {
    formData: FormData;
    status: "idle" | "sending" | "success" | "error";
    responseMessage: string;
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const ContactForm: React.FC<Props> = ({
    formData,
    status,
    responseMessage,
    handleChange,
    handleSubmit,
}) => {
    const inputStyle =
        "flex-1 p-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";

    return (
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
                        className={inputStyle}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputStyle}
                    />
                </div>
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`${inputStyle} w-full`}
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`${inputStyle} w-full resize-none`}
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
    );
};

export default ContactForm;
