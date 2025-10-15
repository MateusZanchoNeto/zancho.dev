"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { skillsData } from "./aboutMeData";
import SkillCategory from "./SkillCategory";

const AboutMe: React.FC = () => {
    const settings = useSelector((state: RootState) => state.settings);

    const theme = useMemo(() => {
        const isMatrix = settings.theme === "matrix";
        return {
            profileImage: isMatrix ? "/matrix-profile.jpg" : "/profile.jpg",
            borderColor: isMatrix ? "border-green-500" : "border-cyan-500",
            accentColor: isMatrix ? "text-green-400" : "text-cyan-400",
        };
    }, [settings.theme]);

    return (
        <div className="w-full bg-gray-800 p-6 text-gray-200 rounded-xl">
            <header className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/10">
                <Image
                    src={theme.profileImage}
                    alt="Mateus Zancho Neto"
                    width={120}
                    height={120}
                    className={`rounded-full border-2 ${theme.borderColor}`}
                />
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white">Mateus Zancho Neto</h1>
                    <p className={`text-lg ${theme.accentColor}`}>Full Stack Developer</p>
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
                        {Object.entries(skillsData).map(([category, tech]) => (
                            <SkillCategory
                                key={category}
                                category={category}
                                skills={tech}
                                accentColor={theme.accentColor}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AboutMe;
