"use client";

import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const skills = {
    "Backend & APIs": ["Node.js", "Java", "Spring Boot", "gRPC", "REST", "SOAP"],
    Frontend: [
        "JavaScript (ES6+)",
        "React.js",
        "Next.js",
        "Node.js",
        "HTML/CSS",
        "Redux",
        "jest",
    ],
    "Databases & Caching": ["PostgreSQL", "MongoDB", "Nginx"],
    "Systems Programming": ["C++", "C-Harbour", "xHarbour", "Rust"],
    "DevOps & Tools": [
        "Docker",
        "AWS",
        "Linux",
        "HTTP/HTTPS",
        "FTP",
        "Git",
        "CI/CD principles",
    ],
    Methodologies: ["Agile/Scrum", "Parallel Processing", "Code Refactoring"],
    "Soft Skills": [
        "Communication",
        "Teamwork",
        "Problem Solving",
        "Leadership",
        "Adaptability",
        "Critical Thinking",
        "Time Management",
        "Active Listening",
        "Empathy",
        "Creativity",
    ],
};

const AboutMe: React.FC = () => {
    const settings = useSelector((state: RootState) => state.settings);

    const isMatrix = settings.theme === "matrix";
    const profileImage = isMatrix ? "/matrix-profile.jpg" : "/profile.jpg";
    const borderColor = isMatrix ? "border-green-500" : "border-cyan-500";
    const accentColor = isMatrix ? "text-green-400" : "text-cyan-400";

    return (
        <div className="w-full  bg-gray-800 p-6 text-gray-200 rounded-xl">
            <header className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/10">
                <Image
                    src={profileImage}
                    alt="Mateus Zancho Neto"
                    width={120}
                    height={120}
                    className={`rounded-full border-2 ${borderColor}`}
                />
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white">Mateus Zancho Neto</h1>
                    <p className={`text-lg ${accentColor}`}>Full Stack Developer</p>
                </div>
            </header>

            <main className="mt-6">
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">About Me</h2>
                    <p className="text-gray-300 leading-relaxed">
                        A Full Stack Developer with over 3 years of experience designing and
                        delivering high-performance, end-to-end systems. I specialize in
                        building flexible and reactive user interfaces with React.js,
                        Next.js, and Redux, powered by robust backend microservices in
                        Node.js, Rust, and Java Spring Boot.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-4">Technical Stack</h2>
                    <div className="space-y-4">
                        {Object.entries(skills).map(([category, tech]) => (
                            <div key={category}>
                                <h3 className={`font-bold ${accentColor} mb-2`}>{category}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {tech.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-gray-700 text-gray-300 text-sm font-mono px-3 py-1 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutMe;
