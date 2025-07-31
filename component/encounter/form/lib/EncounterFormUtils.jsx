// Transforme un niveau (ex: "1/2", "3") en nombre flottant
export function parseLevel(levelStr) {
    if (!levelStr) return Infinity;

    if (levelStr.includes('/')) {
        const [numerator, denominator] = levelStr.split('/').map(Number);
        return denominator ? numerator / denominator : Infinity;
    }

    const parsed = parseFloat(levelStr);
    return isNaN(parsed) ? Infinity : parsed;
}

// Trie les monstres par niveau croissant
export function getSortedMonsters(monsters) {
    return [...monsters].sort((a, b) => parseLevel(a.level) - parseLevel(b.level));
}

// Regroupe les monstres sélectionnés par nom
export function getMonsterToSave(selectedMonsters) {
    const countMap = new Map();

    for (const monster of selectedMonsters) {
        const id = monster.id;
        countMap.set(id, (countMap.get(id) || 0) + 1);
    }

    return Array.from(countMap.entries()).map(([monster_id, monster_number]) => ({
        monster_id,
        monster_number,
    }));
}

// Calcule la difficulté de la rencontre
export function computeDifficultyLabel({ nbHeroes, levelHeroes, selectedMonsters }) {
    const totalHeroLevel = nbHeroes * levelHeroes;
    const monsterLevel = getTotalMonsterLevel(selectedMonsters, nbHeroes);

    const getDifficulty = () => {
        if (totalHeroLevel === 0 || monsterLevel === 0) return { label: '-', color: '' };
        if (monsterLevel <= totalHeroLevel * 0.5)
            return { label: 'Facile', color: 'text-green-600' };
        if (monsterLevel <= totalHeroLevel * 0.75)
            return { label: 'Moyen', color: 'text-yellow-500' };
        if (monsterLevel <= totalHeroLevel) return { label: 'Difficile', color: 'text-red-600' };
        if (monsterLevel <= totalHeroLevel * 1.25) return { label: 'Mortel', color: 'text-black' };
        if (monsterLevel >= totalHeroLevel * 1.5)
            return { label: '💀 Très Mortel', color: 'text-black' };
        return { label: 'Mortel', color: 'text-black' };
    };

    return getDifficulty();
}

// Calcule le niveau total d'une liste de monstres
export function getTotalMonsterLevel(monsters, nbHeroes) {
    const total = monsters.reduce((acc, m) => {
        const baseLevel = parseLevel(m.level);
        return acc + (m.legendary ? baseLevel * nbHeroes : baseLevel);
    }, 0);
    return Math.round(total * 10) / 10;
}

export function getTotalMonsterLevelInCombat(monsters, nbHeroes) {
    const total = monsters.reduce((acc, m) => {
        const baseLevel = parseLevel(m.monster.level);
        return acc + (m.monster.legendary ? baseLevel * nbHeroes : baseLevel);
    }, 0);
    return Math.round(total * 10) / 10;
}

export function computeDifficultyLabelInCombat({ nbHeroes, levelHeroes, selectedMonsters }) {
    const totalHeroLevel = nbHeroes * levelHeroes;
    const monsterLevel = getTotalMonsterLevelInCombat(selectedMonsters, nbHeroes);

    const getDifficulty = () => {
        if (totalHeroLevel === 0 || monsterLevel === 0) return { label: '-', color: '' };
        if (monsterLevel <= totalHeroLevel * 0.5)
            return { label: 'Facile', color: 'text-green-600' };
        if (monsterLevel <= totalHeroLevel * 0.75)
            return { label: 'Moyen', color: 'text-yellow-500' };
        if (monsterLevel <= totalHeroLevel) return { label: 'Difficile', color: 'text-red-600' };
        if (monsterLevel <= totalHeroLevel * 1.25) return { label: 'Mortel', color: 'text-black' };
        if (monsterLevel >= totalHeroLevel * 1.5)
            return { label: '💀 Très Mortel', color: 'text-black' };
        return { label: 'Mortel', color: 'text-black' };
    };

    return getDifficulty();
}