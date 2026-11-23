import { useGameStore } from "../store/gameStore";

export function StoreTest() {
    const resource = useGameStore(
        (state) => state.resources
    );

    const clickPower = useGameStore(
        (state) => state.clickPower
    );

    const production = useGameStore(
        (state) => state.production
    );

    const collectResource = useGameStore(
        (state) => state.collectResource
    );

    const sellResource = useGameStore(
        (state) => state.sellResource
    );

    const buyUpgrade = useGameStore(
        (state) => state.buyUpgrade
    );

    const buyBuilding = useGameStore(
        (state) => state.buyBuilding
    );

    return (
        <div style={{padding: 30}}>
            <h1>Тест игрового Store</h1>

            <h2>Ресурсы</h2>
            
            <p>Дерево: {resource.wood}</p>
            <p>Камень: {resource.stone}</p>
            <p>Еда: {resource.food}</p>
            <p>Золото: {resource.gold}</p>

            <h2>Сила клика</h2>

            <p>Дерево: {clickPower.wood}</p>
            <p>Камень: {clickPower.stone}</p>
            <p>Еда: {clickPower.food}</p>

            <h2>Производство</h2>

            <p>Дерево: {production.wood}</p>
            <p>Камень: {production.stone}</p>
            <p>Еда: {production.food}</p>

            <hr />

            <h2>Добыча</h2>

            <button onClick={() =>collectResource("wood")}>
                Добыть дерево
            </button>

            <button onClick={() =>collectResource("stone")}>
                Добыть камень
            </button>

            <button onClick={() =>collectResource("food")}>
                Собрать еду
            </button>

            <hr />

            <h2>Продажа</h2>

            <button onClick={() => sellResource("wood", 10)}>
                Продать 10 дерево
            </button>

            <button onClick={() => sellResource("stone", 10)}>
                Продать 10 камня
            </button>

            <button onClick={() => sellResource("food", 10)}>
                Продать 10 еды
            </button>

            <hr />

            <h2>Улучшения</h2>

            <button onClick={() => buyUpgrade("woodcutting_axe")}>
                Купить острый топор (20 золота)
            </button>

            <button onClick={() => buyUpgrade("iron_pickaxe")}>
                Купить железную кирку (20 золота)
            </button>

            <button onClick={() => buyUpgrade("woodcutting_axe")}>
                Купить острый топор (20 золота)
            </button>

            <hr />

            <h2>Здания</h2>

            <button onClick={() => buyBuilding("lumberjack_hut")}>
                Купить хижину лесоруба (100 золота)
            </button>

            <button onClick={() => buyBuilding("quarry")}>
                Купить каменоломню (150 золота)
            </button>

            <button onClick={() => buyBuilding("farm")}>
                Купить ферму (120 золота)
            </button>
        </div>
    )
}