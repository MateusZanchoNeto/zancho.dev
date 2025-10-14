import React from "react";
import SkillTag from "./SkillTag";

interface Props {
    category: string;
    skills: string[];
    accentColor: string;
}

const SkillCategory = ({ category, skills, accentColor }: Props) => (
    <div>
        <h3 className={`font-bold ${accentColor} mb-2`}>{category}</h3>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
                <SkillTag key={skill} skill={skill} />
            ))}
        </div>
    </div>
);

export default SkillCategory;
