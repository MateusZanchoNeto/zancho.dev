"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoadingScreen from "@/components/LoadingScreen";
import LoginScreen from "@/components/LoginScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
    const status = useSelector((state: RootState) => state.app.status);

    switch (status) {
        case "BOOTING":
            return <LoadingScreen />;
        case "LOGIN":
            return <LoginScreen />;
        case "DESKTOP":
            return <Desktop />;
    }
}
