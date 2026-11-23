import {Trees, Mountain, Wheat, Coins} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ResourceType } from "../../types/game"
import { useGameStore } from "../../store/gameStore"
import "./ResourceBar.css"

// Иконки ресурсов
const resourceIcons: Record<ResourceType, LucideIcon> = {
    wood: Trees,
    stone: Mountain,
    food: Wheat,
    gold: Coins
};

// CSS Классы для каждого ресурса
const resourceColors: Record<ResourceType, string> = {
    wood:  "resource-wood",
    stone: "resource-stone",
    food:  "resource-food",
    gold:  "resource-gold"
};

// Форматирование чисел
const numberFormatter = new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 1,
});

export function ResourceBar() {
    //Получаем ресурсы из Zustand
    const resources = useGameStore(
        (state) => state.resources
    );

    // Порядок отображения ресуррсов
    const resourcesOrder: ResourceType[] = [
        "wood",
        "stone",
        "food",
        "gold"
    ];

    // Получаем название ресурса
    function getResourceName(resource: ResourceType): string {
        const names: Record<ResourceType, string> = {
            wood: "Дерево",
            stone: "Камень",
            food: "Еда",
            gold: "Золото"
        };

        return names[resource]
    }

    return (
        <header className="resource-bar">
            <div className="resource-bar__container">

                <div className="resource-bar__title">
                    <h2>Королевство с нуля</h2>
                    <span>Ваши ресурсы:</span>
                </div>

                <div className="resource-bar__list">
                    {resourcesOrder.map((resource) => {
                        const Icon = resourceIcons[resource];

                        return (
                            <div key={resource} className={`resource-card ${resourceColors[resource]}`}>
                                
                                <div className="resource-card__icon">
                                    <Icon size={24} strokeWidth={1.8} />
                                </div>

                                <div className="resource-card__info">
                                    <span className="resource-card__name">
                                        {getResourceName(resource)}
                                    </span>

                                    <strong className="resource-card__amount">
                                        {numberFormatter.format(resources[resource])}
                                    </strong>
                                </div>

                            </div>
                        )
                    })}
                </div>

            </div>
        </header>
    )
}