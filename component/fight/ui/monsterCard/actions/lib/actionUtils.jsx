import { formatDice } from '@/lib/diceutils';
import AttackButton from '../button/AttackButton';
import SummonButton from '../button/SummonButton';
import StatusButton from '../button/StatusButton';
import AdvantageButton from '../button/AdvantageButton';

export function getActionContent(
    action,
    passive,
    addMonsterCard,
    monsterName,
    status,
    allChecked,
    isMinion,
    nbHeroes
) {
    const parts = action.description.split(/(\$[^$]+\$)/g); // Match tout ce qui est entre deux $

    return (
        <>
            {parts.map((part, index) => {
                const tokenMatch = part.match(/^\$(.+)\$$/); // Is token block
                if (!tokenMatch) {
                    // Texte normal
                    return <span key={`text-${index}`}>{part}</span>;
                }

                const parsed = parseToken(tokenMatch[1]); // Envoie juste le contenu : "dice:2d4+5"
                if (!parsed) {
                    return (
                        <span key={`invalid-${index}`} className="text-red-600 italic">
                            [token invalide]
                        </span>
                    );
                }

                switch (parsed.type) {
                    case 'dice':
                        const diceText = formatDice(parsed.diceProperty);
                        return (
                            <AttackButton
                                key={`dice-${index}`}
                                diceText={diceText}
                                diceProperty={parsed.diceProperty}
                                action={action}
                                passive={passive}
                                monsterName={monsterName}
                                status={status}
                                allChecked={allChecked}
                                isMinion={isMinion}
                            />
                        );
                    case 'status':
                        return (
                            <StatusButton
                                key={`status-${index}`}
                                statusName={parsed.name}
                                passive={passive}
                                allChecked={allChecked}
                            />
                        );
                    case 'summon':
                        const quantity = parsed.perHero ? nbHeroes * parsed.quantity : parsed.quantity;
                        return (
                            <SummonButton
                                key={`summon-${index}`}
                                summonName={parsed.name}
                                quantity={quantity}
                                action={action}
                                passive={passive}
                                addMonsterCard={addMonsterCard}
                                allChecked={allChecked}
                            />
                        );
                    case 'advantage':
                        return (
                            <AdvantageButton
                                key={`advantage-${index}`}
                                advantageNumber={parsed.advantageNumber}
                                passive={passive}
                                allChecked={allChecked}
                            />
                        );
                    default:
                        return <span key={`text-${index}`}>{part}</span>;
                }
            })}
        </>
    );
}

export function parseToken(token) {
    const diceRegex = /^dice:(\d*)d(\d+)([+-]\d+)?$/;
    const statusRegex = /^status:(\w+)$/;
    const summonRegex = /^summon:(\w+):(\d+)(h?)$/;
    const advantageRegex = /^advantage:([+-]\d+)$/;

    const diceMatch = token.match(diceRegex);
    if (diceMatch) {
        const [, numberDiceRaw, valueDiceRaw, bonusRaw] = diceMatch;
        return {
            type: 'dice',
            diceProperty: {
                numberDice: parseInt(numberDiceRaw || '1', 10),
                valueDice: parseInt(valueDiceRaw, 10),
                bonus: bonusRaw ? parseInt(bonusRaw, 10) : 0,
            },
        };
    }

    const statusMatch = token.match(statusRegex);
    if (statusMatch) {
        return { type: 'status', name: statusMatch[1] };
    }

    const summonMatch = token.match(summonRegex);
    if (summonMatch) {
        const [, monsterId, rawQuantity, perHeroFlag] = summonMatch;
        return {
            type: 'summon',
            name: monsterId,
            quantity: parseInt(rawQuantity, 10),
            perHero: perHeroFlag === 'h',
        };
    }

    const advantageMatch = token.match(advantageRegex);
    if (advantageMatch) {
        const [, advantageNumber] = advantageMatch;
        return {
            type: 'advantage',
            advantageNumber: advantageNumber,
        };
    }

    return null;
}

export function getDiceImagePath(diceProperty) {
    const value = diceProperty.valueDice;
    return `/dice/d${value}.png`;
}

export function getAdvantage(action, status) {
    const modifiers = [];

    if (action.advantage) {
        modifiers.push({
            type: 'advantage',
            name: action.advantage.name,
            description: action.advantage.description,
        });
    }

    if (action.disadvantage) {
        modifiers.push({
            type: 'disadvantage',
            name: action.disadvantage.name,
            description: action.disadvantage.description,
        });
    }

    status?.forEach(s => {
        if (s.advantage) {
            modifiers.push({
                type: 'advantage',
                name: s.advantage.name,
                description: s.advantage.description,
            });
        }

        if (s.disadvantage) {
            modifiers.push({
                type: 'disadvantage',
                name: s.disadvantage.name,
                description: s.disadvantage.description,
            });
        }
    });

    return modifiers;
}
