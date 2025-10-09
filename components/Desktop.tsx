import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import TopBar from "./TopBar";
import Toolbar from "./Toolbar";
import Window from "./Window";
import Calculator from "./apps/Calculator";
import TaskManager from "./apps/taskManager";

const AboutMeContent = () => <div>This is the About Me section.</div>;
const ProjectsContent = () => <div>Here are my projects.</div>;
const ContactContent = () => <div>Contact me here.</div>;

const Desktop: React.FC = () => {
    const { windows } = useSelector((state: RootState) => state.windows);

    const renderWindowContent = (id: string) => {
        switch (id) {
            case "aboutMe":
                return <AboutMeContent />;
            case "projects":
                return <ProjectsContent />;
            case "contact":
                return <ContactContent />;
            case "calculator":
                return <Calculator />;
            case "taskManager":
                return <TaskManager />;
            default:
                return <div>Content for {id}</div>;
        }
    };

    return (
        <main className="h-screen w-screen desktop-background flex flex-col overflow-hidden">
            <TopBar />

            <div className="flex-grow relative">
                {windows.map((win) => (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        position={win.position}
                        zIndex={win.zIndex}
                        size={win.size}
                    >
                        {renderWindowContent(win.id)}
                    </Window>
                ))}
            </div>

            <Toolbar />
        </main>
    );
};

export default Desktop;
