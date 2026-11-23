import type { UpgradeConfig, UpgradeID } from "../../types/game";

// Конфигурация улучшений
export const upgradesConfig = {
    woodcutting_axe: {
        id: "woodcutting_axe",
        name: "Острый топор",
        description: "Увеличивает добычу дерева на 1 за клик",

        cost: {
            gold: 20
        },

        effect: {
            type: "click_power",
            resource: "wood",
            amount: 1
        },

        maxLevel: 1
    },

    iron_pickaxe: {
        id: "iron_pickaxe",
        name: "Железная кирка",
        description: "Увеличивает добычу камня на 1 за клик",

        cost: {
            gold: 20
        },

        effect: {
            type: "click_power",
            resource: "stone",
            amount: 1
        },

        maxLevel: 1
    },

    gathering_basket: {
        id: "gathering_basket",
        name: "Плетенная корзина",
        description: "Увеличивает сбор еды на 1 ща клик",

        cost: {
            gold: 20
        },

        effect: {
            type: "click_power",
            resource: "food",
            amount: 1
        },

        maxLevel: 1
    },

    master_lumbering: {
        id: "master_lumbering",
        name: "Мастерство лесоруба",
        description: "Увеличивает добычу дерева на 2 за клик",

        cost: {
            gold: 100
        },

        effect: {
            type: "click_power",
            resource: "wood",
            amount: 2
        },

        maxLevel: 1
    },

    master_mining: {
        id: "master_mining",
        name: "Мастерство шахтёра",
        description: "Увеличивает добычу камня на 2 за клик",

        cost: {
            gold: 100
        },

        effect: {
            type: "click_power",
            resource: "stone",
            amount: 2
        },

        maxLevel: 1
    }
} satisfies Record<UpgradeID, UpgradeConfig>;