"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoadingScreen from "@/components/LoadingScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
    const isBooting = useSelector((state: RootState) => state.loading.isBooting);

    return <>{isBooting ? <LoadingScreen /> : <Desktop />}</>;
}
