// Calcule la difficulté d'une rencontre et retourne un objet { label, color }
export function parseLevel(levelStr) {
    if (!levelStr) return Infinity;
    const levelPart = levelStr.split(',')[0].trim();
    if (levelPart.includes('/')) {
        const [numerator, denominator] = levelPart.split('/').map(Number);
        return numerator / denominator;
    }
    const parsed = parseFloat(levelPart);
    return isNaN(parsed) ? Infinity : parsed;
}

export function computeDifficultyLabel({ nbHeroes, levelHeroes, selectedMonsters }) {
    const totalHeroLevel = nbHeroes * levelHeroes;
    const monsterLevel =
        Math.round(
            selectedMonsters.reduce((acc, m) => {
                const baseLevel = parseLevel(m.level) || 0;
                return acc + (m.legendary ? baseLevel * nbHeroes : baseLevel);
            }, 0) * 10,
        ) / 10;
    let label = '-';
    let color = '';
    if (totalHeroLevel === 0 || monsterLevel === 0) {
        label = '-';
        color = '';
    } else if (monsterLevel <= totalHeroLevel * 0.5) {
        label = 'Facile';
        color = 'text-green-600';
    } else if (monsterLevel <= totalHeroLevel * 0.75) {
        label = 'Moyen';
        color = 'text-yellow-500';
    } else if (monsterLevel <= totalHeroLevel) {
        label = 'Difficile';
        color = 'text-red-600';
    } else if (monsterLevel <= totalHeroLevel * 1.25) {
        label = 'Mortel';
        color = 'text-black';
    } else if (monsterLevel >= totalHeroLevel * 1.5) {
        label = '💀 Très Mortel';
        color = 'text-black';
    } else {
        label = 'Mortel';
        color = 'text-black';
    }
    return { label, color };
}

export function getTotalMonsterLevel(monsters, nbHeroes) {
    // Additionne les niveaux, multiplie par nbHeroes si legendary
    const total = monsters.reduce((acc, m) => {
        const baseLevel = parseLevel(m.level) || 0;
        return acc + (m.legendary ? baseLevel * nbHeroes : baseLevel);
    }, 0);
    // Arrondi à un chiffre après la virgule
    return Math.round(total * 10) / 10;
}
