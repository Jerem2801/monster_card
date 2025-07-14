export function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

export function doCritic(allResultDices, firstResult, valueDice, onCritic) {
    if (firstResult === valueDice) {
        onCritic?.();
        const newValue = Math.floor(Math.random() * valueDice) + 1;
        allResultDices.push(newValue);
        doCritic(allResultDices, newValue, valueDice, onCritic);
    }
    return allResultDices;
}

export function doAdvantage(advantageAbsolute, allResultDices, advantage) {
    if (advantageAbsolute === 0) {
        return {
            final: allResultDices,
            annotated: allResultDices.map(value => ({
                value,
                kept: true,
            })),
        };
    }

    const dicesWithIndex = allResultDices.map((value, index) => ({ value, index }));
    dicesWithIndex.sort((a, b) => a.value - b.value);

    const toDiscard =
        advantage > 0
            ? dicesWithIndex.slice(0, advantageAbsolute) // On jette les plus petits
            : dicesWithIndex.slice(-advantageAbsolute); // On jette les plus grands

    const discardedIndexes = new Set(toDiscard.map(d => d.index));

    const annotated = allResultDices.map((value, index) => ({
        value,
        kept: !discardedIndexes.has(index),
    }));

    const finalValues = annotated.filter(d => d.kept).map(d => d.value);

    return {
        final: finalValues,
        annotated,
    };
}

export function checkFailed(allResultDices, onFailed) {
    if (allResultDices[0] === 1) {
        onFailed?.();
    }
}

export function throwDice(diceProperty, advantage) {
    const advantageAbsolute = Math.abs(advantage);
    const totalToRoll = diceProperty.numberDice + advantageAbsolute;
    const valueDice = diceProperty.valueDice;

    // Génération brute des dés
    const rawRolls = Array.from(
        { length: totalToRoll },
        () => Math.floor(Math.random() * valueDice) + 1,
    );

    // Application de l'avantage/désavantage
    const { final: keptDiceValues, annotated } = doAdvantage(
        advantageAbsolute,
        rawRolls,
        advantage,
    );

    // Ajout des critiques
    let isCriticResult = false;
    let isFailedResult = false;
    const finalDiceList = [];

    annotated.forEach((die, idx) => {
        finalDiceList.push({
            value: die.value,
            kept: die.kept,
            discarded: !die.kept,
            primary: false,
            extra: false,
        });
    });

    // Recherche du 1er dé gardé pour vérifier s’il est critique
    const primaryIndex = finalDiceList.findIndex(d => d.kept);
    if (primaryIndex !== -1 && finalDiceList[primaryIndex].value === valueDice) {
        isCriticResult = true;
        finalDiceList[primaryIndex].primary = true;

        let lastCritValue = valueDice;
        while (lastCritValue === valueDice) {
            const extra = Math.floor(Math.random() * valueDice) + 1;
            lastCritValue = extra;
            finalDiceList.push({
                value: extra,
                kept: true,
                discarded: false,
                primary: false,
                extra: true,
            });
        }
    } else if (primaryIndex !== -1) {
        finalDiceList[primaryIndex].primary = true;
    }

    // Vérification d’un échec critique (si tous les dés gardés == 1)
    const keptForFailureCheck = finalDiceList.filter(d => d.kept).map(d => d.value);
    checkFailed(keptForFailureCheck, () => {
        isFailedResult = true;
    });

    // Total des dés gardés (bonus ignoré pour l’instant)
    const totalKept = finalDiceList.filter(d => d.kept).reduce((sum, d) => sum + d.value, 0);

    const totalWithBonus = totalKept + parseInt(diceProperty.bonus || 0, 10);

    return {
        type: isCriticResult ? 'critic' : isFailedResult ? 'failed' : 'normal',
        total: totalWithBonus,
        dices: finalDiceList,
        diceProperty,
    };
}

export function formatDice({ numberDice, valueDice, bonus }) {
    let result = `${numberDice}d${valueDice}`;
    if (bonus && bonus !== 0) {
        result += bonus > 0 ? `+${bonus}` : `${bonus}`;
    }
    return result;
}
