import { useState } from "react";
import { Trees, Mountain, Wheat, ShoppingCart, Coins } from "lucide-react";
import { useGameStore } from "../../store/gameStore";
import { resourcesConfig } from "../../game/config/resources";
import type { CollectibleRecourceType } from "../../types/game";
import "./TradingShop.css"

//Ресурсы доступные для продажи
const tradableResources: {
    id: CollectibleRecourceType;
    name: string;
    icon: typeof Trees;
    description: string;
    className: string;
}[] = [
    {
        id: "wood",
        name: "Дерево",
        icon: Trees,
        description: "Продай древесину и получи золото",
        className: "wood"
    },
    {
        id: "stone",
        name: "Камень",
        icon: Mountain,
        description: "Продай добытый камень",
        className: "stone"
    },
    {
        id: "food",
        name: "Еда",
        icon: Wheat,
        description: "Продай собранные припасы",
        className: "food"
    }
];

export default function TradingShop() {
    //Получаем состояния и действия
    const resources = useGameStore(
        (state) => state.resources
    );

    const sellResource = useGameStore(
        (state) => state.sellResource
    );

    // Количество ресурсов для продажи
    const [amoounts, setAmounts] = useState<
        Record<CollectibleRecourceType, string>
    >({
        wood: "1",
        stone: "1",
        food: "1"
    });

    // Изменений количества в поле ввода
    const hadleAmountChange = (
        resource: CollectibleRecourceType,
        value: string
    ) => {
        if (value !== "" && !/^\d+$/.test(value)) {
            return;
        }

        setAmounts((current) => ({
            ...current,
            [resource]: value
        }))
    };

    // Продажа указанного количества
    const handleSell = (
        resource: CollectibleRecourceType
    ) => {
        const amount = Number(amoounts[resource]);
        const success = sellResource(resource, amount);

        if (success) {
            setAmounts((current) => ({
                ...current,
                [resource]: "1"
            }));
        }
    };

    // Продажа всеего запаса ресурсов
    const hadleSellAll = (
        resource: CollectibleRecourceType
    ) => {
        const amount = resources[resource];

        if (amount > 0) {
            const success = sellResource(resource, amount);

            if (success) {
                setAmounts((current) => ({
                    ...current,
                    [resource]: "1"
                }));
            }
        }
    };

    return (
        <section className="trading-shop">

            <div className="trading-shop__header">
                <h2>Торговая лавка</h2>
                <p>Продавай ресурсы торговцам в обмен на золото</p>
            </div>

            <div className="trading-shop__list">
                {tradableResources.map((resource) => {
                    const stock = resources[resource.id];
                    const price = resourcesConfig[resource.id].sellPrice;
                    const amount = Number(amoounts[resource.id]);

                    const canSell = Number.isInteger(amount) && amount > 0 && amount <= stock

                    const Icon = resource.icon;

                    return (
                        <article className={`trading-card trading-card--${resource.className}`} key={resource.id}>
                            <Icon 
                                className="trading-card__icon"
                                size={36}
                                strokeWidth={1.8}
                            />

                            <div className="trading-card__content">
                                <h3>{resource.name}</h3>
                                <p>{resource.description}</p>
                            </div>

                            <div className="trading-card__stock">
                                <span>В наличии</span>
                                <strong>{stock}</strong>
                            </div>

                            <div className="trading-card__price">
                                <span>Цена за единицу</span>

                                <strong>
                                    <Coins size={15} />
                                    {price}
                                </strong>
                            </div>

                            <label 
                                htmlFor={`sell-${resource.id}`} 
                                className="trading-card__label">

                                Количество для продажи

                            </label>

                            <input
                                id={`sell-${resource.id}`}
                                className="trading-card__input" 
                                type="number"
                                min={1}
                                max={stock}
                                step="1"
                                value={amoounts[resource.id]}
                                onChange={(event) => 
                                    hadleAmountChange(
                                        resource.id,
                                        event.target.value
                                    )
                                } 
                            />

                            <div className="trading-card__revenue">
                                <Coins size={16} />

                                <span>
                                    Выручка: {" "}
                                    {canSell ? amount * price : 0}{" "}
                                    золота
                                </span>
                            </div>

                            <div className="trading-card__buttons">
                                <button
                                    type="button"
                                    className="trading-card__action"
                                    disabled={!canSell}
                                    onClick={() => handleSell(resource.id)}>

                                    Продать

                                </button>

                                <button
                                    type="button"
                                    className="trading-card__action trading-card__action--all"
                                    disabled={stock <=0}
                                    onClick={() => hadleSellAll(resource.id)}>

                                    Продать всё

                                </button>
                            </div>
                        </article>
                    )
                })}
            </div>

        </section>
    )
}