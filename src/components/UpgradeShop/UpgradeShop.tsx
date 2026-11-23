import {Axe, Pickaxe, ShoppingBasket, Trees, Mountain, Coins, Check, Lock} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { UpgradeID, CollectibleRecourceType } from '../../types/game'
import { upgradesConfig } from '../../game/config/upgrades'
import { useGameStore } from '../../store/gameStore'
import './UpgradeShop.css'

//Иконки улучшений
const upgradeIcons: Record<UpgradeID, LucideIcon> = {
    woodcutting_axe: Axe,
    iron_pickaxe: Pickaxe,
    gathering_basket: ShoppingBasket,
    master_lumbering: Trees,
    master_mining: Mountain
};

//Названия ресурсов
const resourceNames: Record<CollectibleRecourceType, string> = {
    wood: "дерева",
    stone: "камня",
    food: "еды"
};

// Форматирование чисел
const numberFormatter = new Intl.NumberFormat("ru-RU");

// Компонент магазина
export function UpgardeShop() {
    // Получаем ресурсы игрока
    const resources = useGameStore(
        (state) => state.resources
    );

    // Получаем уровни улучшений
    const upgradeLevels = useGameStore(
        (state) => state.upgradeLevels
    );

    // Получаем функцию покупки
    const buyUpgrade = useGameStore(
        (state) => state.buyUpgrade
    );

    // Получаем список улучшений
    const upgrades = Object.values(upgradesConfig);

    return (
        <section className='upgrade-shop'>
            
            <div className='upgrade-shop__header'>
                <div>
                    <h2>Мастерская</h2>
                    <p>Улучшайте инструменты и увеличивайте добычу ресурсов</p>
                </div>

                <div className='upgrade-shop__balance'>
                    <Coins size={20} />

                    <strong>{numberFormatter.format(resources.gold)}</strong>

                    <span>золота</span>
                </div>
            </div>

            <div className='upgrade-shop__list'>
                {upgrades.map((upgrade) => {
                    const Icon = upgradeIcons[upgrade.id];
                    const currentLevel = upgradeLevels[upgrade.id];
                    const isPurchased = currentLevel >= upgrade.maxLevel;
                    const goldCost = upgrade.cost.gold ?? 0;
                    const canAfford = resources.gold >= goldCost
                    const isDisabled = isPurchased || !canAfford
                    const effectResource = upgrade.effect.resource;
                    const effectAmount = upgrade.effect.amount;

                    return (
                        <article
                            key={upgrade.id}
                            className={`upgrade-card ${
                                isPurchased ? "upgrade-card--purchased" : ""
                            }`}>

                            <div className='upgrade-card__icon'>
                                <Icon size={30} strokeWidth={1.7}/>
                            </div>

                            <div className='upgrade-card__content'>
                                <div className='upgrade-card__title'>
                                    <h3>{upgrade.name}</h3>
                                    {isPurchased && (
                                        <span className='upgrade-card__badge'>
                                            Куплено
                                        </span>
                                    )}
                                </div>

                                <p className='upgrade-card__description'>
                                    {upgrade.description}
                                </p>

                                <div className='upgrade-card__effect'>
                                    <span>Эффект:</span>
                                    <strong>
                                        +{effectAmount} {resourceNames[effectResource]} за клик
                                    </strong>
                                </div>

                                <div className='upgrade-card__footer'>
                                    <div className='upgrade-card__pricce'>
                                        <Coins size={17} />

                                        <strong>
                                            {numberFormatter.format(goldCost)}
                                        </strong>

                                        <span>золота</span>
                                    </div>

                                    <button
                                        type="button"
                                        className='upgrade-crad__button'
                                        disabled={isDisabled}
                                        onClick={() => buyUpgrade(upgrade.id)}>
                                            
                                        {isPurchased ? (
                                            <>
                                                <Check size={16} />
                                                Куплено
                                            </>
                                        ) : !canAfford ? (
                                            <>
                                                <Lock size={16}/>
                                                Не хватает золота
                                            </>
                                        ) : (
                                            "Купить"
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