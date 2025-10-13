"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoadingScreen from "@/components/LoadingScreen";
import LoginScreen from "@/components/LoginScreen";
import Desktop from "@/components/Desktop";
import ShutdownScreen from "@/components/ShutdownScreen";

export default function Home() {
    const status = useSelector((state: RootState) => state.app.status);

    switch (status) {
        case "BOOTING":
            return <LoadingScreen />;
        case "LOGIN":
            return <LoginScreen />;
        case "DESKTOP":
            return <Desktop />;
        case "SHUTTING_DOWN":
            return <ShutdownScreen />;
        default:
            return <LoginScreen />;
    }
}
