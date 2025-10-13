import React from "react";
import { Project } from "./projectsData";
import { ExternalLink } from "lucide-react";

interface Props {
    project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
    return (
        <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gray-700/50 p-4 rounded-lg border border-transparent hover:border-green-500 hover:bg-white/5 transition-all duration-200"
        >
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-100">{project.name}</h3>
                <ExternalLink size={18} className="text-gray-400" />
            </div>
            <p className="text-sm text-green-400 truncate mt-1 mb-3">
                {project.link}
            </p>
            <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-gray-600 text-gray-300 text-xs font-mono px-2 py-1 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </a>
    );
};

export default ProjectCard;
