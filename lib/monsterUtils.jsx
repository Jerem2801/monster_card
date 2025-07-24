import { ARMOR_TYPE } from "@/data/monsterdata";

export function getArmorImagePath(monster) {
    if (!monster?.armor?.id) return;
    return monster.armor.path;
}

export function getArmorType(id) {
    return Object.values(ARMOR_TYPE).find(armor => armor.id === id) || null;
}
