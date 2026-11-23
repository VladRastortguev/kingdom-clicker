import { create } from "zustand";
import { persist } from "zustand/middleware";
import { upgradesConfig } from "../game/config/upgrades";
import { buildingsConfig } from "../game/config/building";

import type {
    BuildingId,
    CollectibleRecourceType,
    ResourcesAmounts,
    ResourceType,
    Resources,
    UpgradeID 
} from "../types/game";

import {
    initialClickPower,
    initialProduction,
    initialResources,
    resourcesConfig
} from "../game/config/resources"

interface GameState {
    resources:  Resources;
    clickPower: Resources;
    production: Resources;

    upgradeLevels: Record<UpgradeID, number>;
    buildings:     Record<BuildingId, number>;
}

interface GameActions {
    // Добыча ресурса
    collectResource: (
        resource: CollectibleRecourceType
    ) => void;

    // Продажа ресурса
    sellResource: (
        resource: CollectibleRecourceType,
        amount: number
    ) => boolean;

    // Покупка улучшения
    buyUpgrade: (upgradeId: UpgradeID) => boolean;

    // Покупка здания
    buyBuilding: (buildingId: BuildingId) => boolean;

    // Начисление ресурсов по времени
    tickProduction: () => void;
}

interface PersistedGameState {
    resources: Resources;
    clickPower: Record<CollectibleRecourceType, number>;
    production: Resources;
    upgradeLevels: Record<UpgradeID, number>;
    buildings: Record<BuildingId, number>;
}

type GameStore = GameState & GameActions;

// Проверяет достаточно ли денег у игрока
function canAfford(
    resources: Resources,
    cost: ResourcesAmounts
): boolean {
    return Object.entries(cost).every(
        ([resource, amount]) => {
            const resourceType = resource as ResourceType;

            return resources[resourceType] >= amount;
        }
    )
}

// Списывает деньги у игрока
function deductCost(
    resources: Resources,
    cost: ResourcesAmounts
): Resources {
    const updatedResources = {...resources};

    Object.entries(cost).forEach(
        ([resource, amount]) => {
            const resourceType = resource as ResourceType;

            updatedResources[resourceType] -=amount
        }
    );

    return updatedResources;
}

export const useGameStore = create<GameStore>()(
    persist (
        (set, get) => ({
            resources:  {...initialResources},
            clickPower: {...initialClickPower},
            production: {...initialProduction},

            upgradeLevels: {
                woodcutting_axe: 0,
                iron_pickaxe: 0,
                gathering_basket: 0,
                master_lumbering: 0,
                master_mining: 0,
            },

            buildings: {
                lumberjack_hut: 0,
                quarry: 0,
                farm: 0
            },

            //=====================================================

            collectResource: (resource) => {
                set((state) => ({
                    resources: {
                        ...state.resources,
                        [resource]:
                            state.resources[resource] +
                            state.clickPower[resource],
                    },
                }));
            },

            //=====================================================

            sellResource: (resource, amount) => {
                const state = get();

                if (
                    !Number.isInteger(amount) || 
                    amount <= 0
                ) {
                    return false;
                }

                if (state.resources[resource] < amount) {
                    return false;
                }

                const sellPrice = resourcesConfig[resource].sellPrice;

                if (sellPrice <= 0) {
                    return false;
                }

                const goldEarned = amount * sellPrice;

                set((currentState) => ({
                    resources: {
                        ...currentState.resources,
                        [resource]:
                            currentState.resources[resource] - amount,

                        gold:
                            currentState.resources.gold + goldEarned,
                    },
                }));

                return true;
            },

            //=========================================

            buyUpgrade: (upgradeId) => {
                const state = get();
                const upgrade = upgradesConfig[upgradeId];
                const currentLevel = state.upgradeLevels[upgradeId];

                // Проверка на макс уровень
                if (currentLevel >= upgrade.maxLevel) {
                    return false;
                }

                // Проверка на наличие ресурсов
                if (!canAfford(state.resources, upgrade.cost)) {
                    return false;
                }

                // Списываем стоимость улучшения
                const updatedResources = deductCost(state.resources, upgrade.cost);

                const resources = upgrade.effect.resource;

                //Применить эффект улучшения
                set({
                    resources: updatedResources,

                    clickPower: {
                        ...state.clickPower,
                        [resources]:
                            state.clickPower[resources] + upgrade.effect.amount,
                    },

                    upgradeLevels: {
                        ...state.upgradeLevels,
                        [upgradeId]: currentLevel + 1,
                    },
                });

                return true;
            },

            // =========================================

            buyBuilding: (buildingId) => {
                const state = get();

                const building = buildingsConfig[buildingId];

                // Проверка на наличие реурсов
                if (!canAfford(state.resources, building.cost)) {
                    return false;
                }

                // Списываем стоимсть здания
                const updatedResources = deductCost(state.resources, building.cost);

                //Явный указатель на общий тип производства
                const buildingProduction: ResourcesAmounts = building.production;

                // Увеличиваем количество зданий
                set({
                    resources: updatedResources,

                    buildings: {
                        ...state.buildings,
                        [buildingId]:
                            state.buildings[buildingId] + 1,
                    },

                    production: {
                        wood:
                            state.production.wood + 
                            (buildingProduction.wood ?? 0),

                        stone:
                            state.production.stone +
                            (buildingProduction.stone ?? 0),

                        food: 
                            state.production.food +
                            (buildingProduction.food ?? 0),

                        gold: 
                            state.production.gold +
                            (buildingProduction.gold ?? 0),
                    },
                });

                return true
            },

            // =========================================

            tickProduction() {
                set((state) => ({
                    resources: {
                        wood: state.resources.wood + state.production.wood,
                        stone: state.resources.stone + state.production.stone,
                        food: state.resources.food + state.production.food,
                        gold: state.resources.gold + state.production.gold,
                    }
                }))
            },

        }),
        {
            name: "kingdom-save",

            partialize: (state): PersistedGameState => ({
                resources: state.resources,
                clickPower: state.clickPower,
                production: state.production,
                upgradeLevels: state.upgradeLevels,
                buildings: state.buildings
            }),

            version: 1,

            merge: (persistedState, currentState) => {
                const saved = persistedState as Partial<PersistedGameState>;

                return {
                    ...currentState,
                    ...saved,

                    resources: {
                        ...currentState.resources,
                        ...saved.resources
                    },

                    clickPower: {
                        ...currentState.clickPower,
                        ...saved.clickPower
                    },

                    production: {
                        ...currentState.production,
                        ...saved.production
                    },

                    upgradeLevels: {
                        ...currentState.upgradeLevels,
                        ...saved.upgradeLevels
                    },

                    buildings: {
                        ...currentState.buildings,
                        ...saved.buildings
                    }
                }
            }
        }
    )
)