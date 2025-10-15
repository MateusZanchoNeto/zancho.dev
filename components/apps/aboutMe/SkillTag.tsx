import React from "react";

const SkillTag = ({ skill }: { skill: string }) => (
    <span className="bg-gray-700 text-gray-300 text-sm font-mono px-3 py-1 rounded">
        {skill}
    </span>
);

export default SkillTag;
