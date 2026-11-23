// Основные типы ресурсов
export type ResourceType =
    | "wood"
    | "stone"
    | "food"
    | "gold";

// Ресурсы которые можно добывать вручную
export type CollectibleRecourceType = 
    Exclude<ResourceType, "gold">;

// Объект со значением всех ресурсов
export type Resources  = Record<ResourceType, number>;

// Объект с необязательными значениями ресурсов
// Используется для стоимости покупок и производства
export type ResourcesAmounts = Partial<Resources>;

// Конфигурация одного ресурса
export interface ResourceConfig {
    id: ResourceType;
    name: string;
    description: string;
    icon: string;

    initialAmount: number;
    baseClickPower: number;

    sellPrice: number;
}

// Индентификаторы улучшений
export type UpgradeID =
    | "woodcutting_axe"
    | "iron_pickaxe"
    | "gathering_basket"
    | "master_lumbering"
    | "master_mining";

// Эффект улучшения
export interface UpgradeEffect {
    type: "click_power";
    resource: CollectibleRecourceType;
    amount: number;
}

// Конфигурация улучшения
export interface UpgradeConfig {
    id: UpgradeID;
    name: string;
    description: string;

    cost: ResourcesAmounts;

    effect: UpgradeEffect;

    maxLevel: number;
}

// Идентификаторы производственных зданий
export type BuildingId =
    | "lumberjack_hut"
    | "quarry"
    | "farm";

// Конфигурация производственного здания
export interface BuildingConfig {
    id: BuildingId;
    name: string;
    description: string;

    cost: ResourcesAmounts;

    production: ResourcesAmounts;
}