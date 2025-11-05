import { useState } from "react";

type FormStatus = "idle" | "sending" | "success" | "error";
export interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const initialFormData: FormData = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

export function useContactForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            setFormData(initialFormData);
        } catch {
            setStatus("error");
        }
    };

    return { formData, status, responseMessage, handleChange, handleSubmit };
}
