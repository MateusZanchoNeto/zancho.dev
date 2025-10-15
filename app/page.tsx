"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoginScreen from "@/components/system/auth/LoginScreen";
import ShutdownScreen from "@/components/system/auth/ShutdownScreen";
import Desktop from "@/components/system/desktop/Desktop";
import LoadingScreen from "@/components/system/auth/LoadingScreen";

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
