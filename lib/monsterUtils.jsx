import { ARMOR_TYPE } from '@/data/monsterdata';

export function formatMonsterName(name) {
    if (!name) return null;
    return name.split(' ').map((word, index) => (
        <span key={index} className="mr-1">
            <span className="text-2xl">{word.charAt(0)}</span>
            <span className="text-lg uppercase">{word.slice(1)}</span>
        </span>
    ));
}

export function getArmorType(value) {
    const selectedId = value === '' ? null : value;
    return Object.values(ARMOR_TYPE).find(a => a.id === selectedId);
}
