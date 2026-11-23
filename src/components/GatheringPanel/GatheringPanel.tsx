import {Trees, Mountain, Wheat} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CollectibleRecourceType } from '../../types/game'
import { useGameStore } from '../../store/gameStore'
import "./GatheringPanel.css"

// Описание добычи объектов
interface GatheringResource {
    id: CollectibleRecourceType,
    name: string,
    description: string,
    actionLabel: string,
    icon: LucideIcon
};

// Конфигурация объектов
const gatheringResources: GatheringResource[] = [
    {
        id: "wood",
        name: "Дерево",
        description: "Рубите древесину в ближайшем лесу",
        actionLabel: "Рубить дерево",
        icon: Trees
    },
    {
        id: "stone",
        name: "Камень",
        description: "Добывайте камень в горной местности",
        actionLabel: "Добывать камень",
        icon: Mountain
    },
    {
        id: "food",
        name: "Еда",
        description: "Добывайте еду для своего королевства",
        actionLabel: "Собирать еду",
        icon: Wheat
    }
];

// CSS Классы объектов
const resourceClasses: Record<CollectibleRecourceType, string> = {
    wood: "gathering-card--wood",
    stone: "gathering-card--stone",
    food: "gathering-card-food"
};

export function GatheringPanel() {
    // Сила клика
    const clickPower = useGameStore(
        (state) => state.clickPower
    );

    // Функция добычи
    const collectResource = useGameStore(
        (state) => state.collectResource
    );

    return (
        <section className='gathering-panel'>

            <div className='gathering-panel__header'>
                <div>
                    <h2>Добыча ресурсов</h2>
                    <p>Используйте доступные ресурсы окружающего мира</p>
                </div>
            </div>

            <div className='gathering-panel__list'>
                
                {gatheringResources.map((resource) => {
                    const Icon = resource.icon;
                    const amount = clickPower[resource.id]
                    
                    return (
                        <button
                            key={resource.id}
                            type="button"
                            className={`gathering-card ${resourceClasses[resource.id]}`}
                            onClick={() => collectResource(resource.id)}
                            aria-label={`${resource.actionLabel}: плюс: ${amount}`}>
                            
                            <div className='gathering-card__icon'>
                                <Icon size={42} strokeWidth={1.6} />
                            </div>

                            <div className='gathering-card__content'>
                                <h3>{resource.name}</h3>
                                <p>{resource.description}</p>

                                <div className='gathering-card__power'>
                                    <span>За один клик</span>
                                    <strong>+{amount}</strong>
                                </div>
                            </div>

                            <div className='gathering-card__action'>
                                {resource.actionLabel}
                            </div>

                        </button>
                    )
                })}
            
            </div>

        </section>
    )
}