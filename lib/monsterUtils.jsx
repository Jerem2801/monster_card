import { ARMOR_TYPE } from '@/data/monsterdata';

export function getArmorType(value) {
    const selectedId = value === '' ? null : value;
    return Object.values(ARMOR_TYPE).find(a => a.id === selectedId);
}
