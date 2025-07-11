export default function LegendaryMechanics({ monster }) {
    const formatDescription = (text, hp) => {
        const parts = text.split('$hp');
        return parts.reduce((acc, part, index) => {
            acc.push(<span key={`text-${index}`}>{part}</span>);
            if (index < parts.length - 1) {
                acc.push(
                    <span key={`hp-${index}`} className="text-lg font-bold text-red-700">
                        {hp}
                    </span>,
                );
            }
            return acc;
        }, []);
    };

    return (
        <div className="mt-4 border-t-2 border-gray-300 pt-4">
            <p>
                <span className="text-xl font-bold">ENSANGLANTÉ: </span>
                {formatDescription(monster.bloodied.description, monster.bloodied.hp)}
            </p>
            <p>
                <span className="text-xl font-bold">DERNIÈRE CHANCE: </span>
                {formatDescription(monster.lastStand.description, monster.lastStand.hp)}
            </p>
        </div>
    );
}

const legendaryMonster = {
    Krogg: (monster, newHp) => updateKrogg(monster, newHp),
    Grimbeak: (monster, newHp) => updateGrimbeak(monster, newHp),
    Greenthumb: (monster, newHp) => updateGreenthumb(monster, newHp),
};

export function updateLegendaryMonster2(monster, newHp) {
    const updatedMonster = legendaryMonster[monster.name](monster, newHp);
    return updatedMonster;
}

function changeValueDice(monster, value) {
    monster.action.map(newAction => {
        if (newAction.dice !== undefined) {
            newAction.dice.valueDice = value;
        }
    });
}

function updateGrimbeak(monster, newHp) {
    if (newHp === 0) {
        changeValueDice(monster, monster.lastStand.newValueDice);
    } else {
        changeValueDice(monster, 6);
    }
    return monster;
}

function updateGreenthumb(monster, newHp) {
    if (newHp <= monster.hp / 2) {
        monster.armor = monster.bloodied.armor;
    } else {
        delete monster.armor;
    }
    if (newHp === 0) {
        monster.action.map(newAction => {
            if (newAction.name === 'ACTIONS.') {
                newAction.description = monster.lastStand.newDescription;
            }
        });
    } else {
        monster.action.map(newAction => {
            if (newAction.name === 'ACTIONS.') {
                newAction.description =
                    "Après chaque tour d'un héro, mouvement de 6 puis choissisez un :";
            }
        });
    }
    return monster;
}

function updateKrogg(monster, newHp) {
    if (newHp <= monster.hp / 2) {
        changeValueDice(monster, 8);
    } else {
        changeValueDice(monster, 6);
    }
    if (newHp === 0) {
        monster.armor = 'L';
    } else {
        monster.armor = 'M';
    }
    return monster;
}
