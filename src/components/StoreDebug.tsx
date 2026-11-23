import { useGameStore } from "../store/gameStore";

export function StoreDebug() {
    const addTestGold = () => {
        useGameStore.setState((state) => ({
            resources: {
                ...state.resources,
                gold: state.resources.gold + 500
            }
        }))
    }

    return (
        <>
            <button
                type="button"
                onClick={addTestGold}>
                +500 золота (тест)
            </button>

            <button onClick={() => {
                localStorage.removeItem("kingdom-save");
                window.location.reload();
            }}>
                сбросить сохранение
            </button>
        </>
    )
}