import { useEffect } from "react";
import { useGameStore } from "../store/gameStore";

export function useProduction() {
    useEffect(() => {
        const intervalId = window.setInterval(() => {
            useGameStore.getState().tickProduction();
        }, 1000);

        return () => {
            window.clearInterval(intervalId)
        };
    }, [])
}