import type { ResourceConfig, ResourceType, Resources } from "../../types/game"

// Конфигурация игровых ресурсов
export const resourcesConfig = {
    wood: {
        id: "wood",
        name: "Дерево",
        description: "Основной строительный материал",
        icon: "trees",

        initialAmount: 0,
        baseClickPower: 1,

        sellPrice: 2
    },

    stone: {
        id: "stone",
        name: "Камень",
        description: "Используется для строительства",
        icon: "mountain",

        initialAmount: 0,
        baseClickPower: 1,

        sellPrice: 3
    },

    food: {
        id: "food",
        name: "Еда",
        description: "Необходима для содержания населения",
        icon: "wheat",

        initialAmount: 0,
        baseClickPower: 1,

        sellPrice: 1
    },

    gold: {
        id: "gold",
        name: "Золото",
        description: "Основная игровая валюта",
        icon: "coins",

        initialAmount: 0,
        baseClickPower: 0,

        sellPrice: 0
    }
} satisfies Record<ResourceType, ResourceConfig>

// Начальное количество ресурсов
export const initialResources: Resources = {
    wood: 0,
    stone: 0,
    food: 0,
    gold: 0
};

// Начальная сила ручной добычи
export const initialClickPower: Resources = {
    wood: 1,
    stone: 1,
    food: 1,
    gold: 0
};

// Начальное автоматическое производство
export const initialProduction: Resources = {
    wood: 0,
    stone: 0,
    food: 0,
    gold: 0
};