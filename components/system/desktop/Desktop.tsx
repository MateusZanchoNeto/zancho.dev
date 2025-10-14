import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import TopBar from "./TopBar";
import Toolbar from "./Toolbar";
import AboutMe from "@/components/apps/aboutMe";
import Projects from "@/components/apps/projects";
import Contact from "@/components/apps/contact";
import Calculator from "@/components/apps/calculator";
import Browser from "@/components/apps/browser";
import TaskManager from "@/components/apps/taskManager";
import FileManager from "@/components/apps/fileManager";
import Notes from "@/components/apps/notes";
import Settings from "@/components/apps/settings";
import Window from "@/components/system/window/Window";

const Desktop: React.FC = () => {
    const { windows } = useSelector((state: RootState) => state.windows);
    const { desktopBackground } = useSelector(
        (state: RootState) => state.settings,
    );

    const renderWindowContent = (id: string) => {
        switch (id) {
            case "aboutMe":
                return <AboutMe />;
            case "projects":
                return <Projects />;
            case "contact":
                return <Contact />;
            case "calculator":
                return <Calculator />;
            case "browser":
                return <Browser />;
            case "taskManager":
                return <TaskManager />;
            case "notes":
                return <Notes />;
            case "files":
                return <FileManager />;
            case "settings":
                return <Settings />;
            default:
                return <div>Content for {id}</div>;
        }
    };

    const desktopStyle: React.CSSProperties =
        desktopBackground.type === "image"
            ? { backgroundImage: desktopBackground.value }
            : { backgroundColor: desktopBackground.value };

    return (
        <main className="h-screen w-screen overflow-hidden relative">
            <div
                className={`
          absolute inset-0 bg-cover bg-center
          ${desktopBackground.blur ? "filter blur-md" : ""}
        `}
                style={desktopStyle}
            />

            <div className="relative z-10 h-full flex flex-col">
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
                            isFullscreen={win.isFullscreen}
                        >
                            {renderWindowContent(win.id)}
                        </Window>
                    ))}
                </div>

                <Toolbar />
            </div>
        </main>
    );
};

export default Desktop;
