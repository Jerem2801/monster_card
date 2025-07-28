// Utilitaires de dé
function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

function rollMultipleDice(count, sides) {
    return Array.from({ length: count }, () => rollDie(sides));
}

// Annoter les dés gardés/jettés
function annotateDice(values, indexesToKeep) {
    return values.map((value, index) => ({
        value,
        kept: indexesToKeep.has(index),
    }));
}

function getKeptIndexes(values, advantage) {
    const sorted = values
        .map((value, index) => ({ value, index }))
        .sort((a, b) => a.value - b.value);

    const toDiscard = advantage > 0
        ? sorted.slice(0, Math.abs(advantage))
        : sorted.slice(-Math.abs(advantage));

    const discardedIndexes = new Set(toDiscard.map(d => d.index));
    return new Set(values.map((_, i) => i).filter(i => !discardedIndexes.has(i)));
}

function applyAdvantage(rawRolls, advantage) {
    if (advantage === 0) {
        return annotateDice(rawRolls, new Set(rawRolls.map((_, i) => i)));
    }
    const keptIndexes = getKeptIndexes(rawRolls, advantage);
    return annotateDice(rawRolls, keptIndexes);
}

function isFailure(values) {
    return values.every(v => v === 1);
}

// Fonction récursive pour gérer les explosions avec effet "vicious"
function explodeCrits(valueDice, countExtra, finalDiceList) {
    for (let i = 0; i < countExtra; i++) {
        const rolled = rollDie(valueDice);
        finalDiceList.push({
            value: rolled,
            kept: true,
            discarded: false,
            primary: false,
            extra: true,
        });

        // Si c’est encore un critique, on relance encore countExtra dés
        if (rolled === valueDice) {
            explodeCrits(valueDice, countExtra, finalDiceList);
        }
    }
}


export function throwDice(diceProperty, advantage = 0, options = {}) {
    // Extraction des options avec valeurs par défaut
    const {
        vicious = false,    // Critique génère 2 dés au lieu de 1
        brutal = false,     // Le plus haut dé gardé devient le primaire
        noCrit = false,     // Désactive les critiques
        noFail = false,     // Désactive les échecs critiques
        forceCrit = false,  // Forcement un critique
    } = options;

    // Décomposition des propriétés du jet
    const { numberDice, valueDice, bonus = 0 } = diceProperty;

    // Nombre total de dés à lancer (en tenant compte de l'avantage)
    const totalToRoll = numberDice + Math.abs(advantage);

    // Lancer des dés bruts
    const rawRolls = rollMultipleDice(totalToRoll, valueDice);

    // Annoter les dés en fonction de l'avantage/désavantage
    const annotated = applyAdvantage(rawRolls, advantage);

    // Préparation des dés avec structure enrichie
    const finalDiceList = annotated.map((d, idx) => ({
        value: d.value,
        kept: d.kept,
        discarded: !d.kept,
        primary: false,
        extra: false,
    }));

    let isCritic = false;
    let isFailed = false;

    // Liste des dés gardés avec leurs index
    const keptDice = finalDiceList
        .map((d, i) => ({ ...d, index: i }))
        .filter(d => d.kept);

    // Index du dé primaire : le plus haut si brutal, sinon le premier gardé
    const primaryIndex = brutal
        ? keptDice.reduce((max, d) => (d.value > max.value ? d : max), keptDice[0])?.index
        : keptDice[0]?.index;

    // Marquer le dé primaire
    if (primaryIndex !== undefined) {
        finalDiceList[primaryIndex].primary = true;

        // Si forceCrit est activé, on force la valeur max sur ce dé primaire
        if (forceCrit) {
            finalDiceList[primaryIndex].value = valueDice;
        }
    }

    // TRAITEMENT DU CRITIQUE (si activé)
    if (!noCrit && primaryIndex !== undefined) {
        const die = finalDiceList[primaryIndex];
        if (die.value === valueDice) {
            isCritic = true;
            const countExtra = vicious ? 2 : 1;

            // Nouvelle version avec explosion récursive
            explodeCrits(valueDice, countExtra, finalDiceList);
        }
    }

    // Vérification d’un échec critique (tous les dés gardés = 1)
    if (!noFail) {
        const keptValues = finalDiceList.filter(d => d.kept).map(d => d.value);
        isFailed = isFailure(keptValues);
    }

    // Calcul du total final avec bonus
    const total =
        finalDiceList.filter(d => d.kept).reduce((sum, d) => sum + d.value, 0) +
        parseInt(bonus, 10);

    // Résultat final du jet
    return {
        type: isCritic ? 'critic' : isFailed ? 'failed' : 'normal',
        total,
        dices: finalDiceList,
        diceProperty,
    };
}


export function formatDice({ numberDice, valueDice, bonus = 0 }) {
    return `${numberDice}d${valueDice}${bonus ? (bonus > 0 ? `+${bonus}` : bonus) : ''}`;
}
