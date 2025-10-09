import TopBar from "./TopBar";

export default function Desktop() {
    return (
        <main className="h-screen w-screen desktop-background">
            <TopBar />
            <div className="flex-grow"></div>
        </main>
    );
}
