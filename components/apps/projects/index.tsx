"use client";

import React from "react";
import { projectsData } from "./projectsData";
import ProjectCard from "./ProjectCard";

const Projects: React.FC = () => {
    return (
        <div className="w-full min-h-full bg-gray-800 p-6 text-gray-200 rounded-xl">
            {projectsData.map((category) => (
                <section key={category.title} className="mb-8">
                    <h2 className="text-2xl font-bold border-b-2 border-green-500/50 pb-2 mb-4">
                        {category.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.projects.map((project) => (
                            <ProjectCard key={project.name} project={project} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Projects;
