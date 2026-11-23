import { Trees, Mountain, Wheat, Coins, Lock} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BuildingId, ResourcesAmounts, ResourceType } from "../../types/game";
import { buildingsConfig } from "../../game/config/building";
import { useGameStore } from "../../store/gameStore";
import "./BuildingShop.css"

// Иконки зданий
const buildingIcons: Record<BuildingId, LucideIcon> = {
    lumberjack_hut: Trees,
    quarry: Mountain,
    farm: Wheat
};

// Названия ресурсов
const resourceNames: Record<ResourceType, string> = {
    wood: "дерево",
    stone: "камень",
    food: "еда",
    gold: "золото"
};

// Форматирование чисел
const numberFormatter = new Intl.NumberFormat("ru-RU");

export function BuildingShop() {
    const resources = useGameStore(
        (state) => state.resources
    );

    const production = useGameStore(
        (state) => state.production
    );

    const buildings = useGameStore(
        (state) => state.buildings
    );

    const buyBuilding = useGameStore(
        (state) => state.buyBuilding
    );

    const buildingList = Object.values(buildingsConfig);

    return (
        <section className="building-shop">

            <div className="building-shop__header">
                <div>
                    <h2>Строительство</h2>
                    <p>Возводите предприятия для автоматической добычи</p>
                </div>

                <div className="building-shop__balance">
                    <Coins size={20} />
                    <strong>{numberFormatter.format(resources.gold)}</strong>
                    <span>золота</span>
                </div>
            </div>

            <div className="building-shop__production">
                <h3>Текущее производство</h3>

                <div className="building-shop__production-list">
                    {(["wood", "stone", "food"] as const).map((resource) => (
                        <div key={resource} className="building-shop__production-item">
                            <span>{resourceNames[resource]}</span>
                            <strong>+{numberFormatter.format(production[resource])} / сек</strong>
                        </div>
                    ))}
                </div>
            </div>

            <div className="building-shop__list">
                {buildingList.map((building) => {
                    const Icon = buildingIcons[building.id];
                    const currentCount = buildings[building.id];
                    const goldCost = building.cost.gold ?? 0;
                    const caAfford = resources.gold >= goldCost;
                    const buildingProduction: ResourcesAmounts = building.production;

                    const productionEntries = (
                        Object.entries(buildingProduction) as [
                            ResourceType,
                            number
                        ][]
                    ).filter(([, amount]) => amount > 0);

                    return (
                        <article key={building.id} className="building-card">
                            <div className="building-card__icon">
                                <Icon size={32} strokeWidth={1.7} />
                            </div>

                            <div className="building-card__content">
                                <div className="building-card__title">
                                    <h3>{building.name}</h3>
                                    <span className="building-card__count">
                                        Построено: {currentCount}
                                    </span>
                                </div>

                                <p className="building-card__description">
                                    {building.description}
                                </p>

                                <div className="building-card__production">
                                    <span>Производство одного здания:</span>
                                    {productionEntries.map(([resource, amount]) => (
                                        <strong key={resource}>
                                            +{amount} {resourceNames[resource]} / сек.
                                        </strong>
                                    ))}
                                </div>

                                <div className="building-card__footer">
                                    <div className="building-card__price">
                                        <Coins size={17} />
                                        <strong>{numberFormatter.format(goldCost)}</strong>
                                        <span>золота</span>
                                    </div>

                                    <button
                                        type="button"
                                        className="building-card__button"
                                        disabled={!caAfford}
                                        onClick={() => buyBuilding(building.id)}>

                                        {!caAfford ? (
                                            <>
                                                <Lock size={16} />
                                                Не хватает золота
                                            </>
                                        ) : (
                                            "Построить"
                                        )}

                                    </button>
                                </div>
                            </div>
                        </article>
                    )
                })}
            </div>

        </section>
    )
}