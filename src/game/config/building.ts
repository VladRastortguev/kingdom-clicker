import type { BuildingConfig, BuildingId } from "../../types/game";

// Конфигурация происзводственных зданий
export const buildingsConfig = {
    lumberjack_hut: {
        id: "lumberjack_hut",
        name: "Хижина лесоруба",
        description: "Автоматически производит дерево",

        cost: {
            gold: 100
        },

        production: {
            wood: 1
        }
    },

    quarry: {
        id: "quarry",
        name: "Каменоломня",
        description: "Автоматически добывает камень",

        cost: {
            gold: 150
        },

        production: {
            stone: 1
        }
    },

    farm: {
        id: "farm",
        name: "Ферма",
        description: "Автоматически производит еду",

        cost: {
            gold: 120
        },

        production: {
            food: 1
        }
    }
} satisfies Record<BuildingId, BuildingConfig>;