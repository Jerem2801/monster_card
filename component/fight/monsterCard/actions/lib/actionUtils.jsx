import { formatDice } from '@/lib/diceutils';
import AttackButton from '../button/AttackButton';
import SummonButton from '../button/SummonButton';
import StatusButton from '../button/StatusButton'; // 👈 Import du bouton de statut

export function getActionContent(action, passive, addMonsterCard, monsterName) {
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
                    return <span key={`invalid-${index}`} className="text-red-600 italic">[token invalide]</span>;
                }

                switch (parsed.type) {
                    case "dice":
                        const diceText = formatDice(parsed.diceProperty);
                        return (
                            <AttackButton
                                key={`dice-${index}`}
                                diceText={diceText}
                                diceProperty={parsed.diceProperty}
                                action={action}
                                passive={passive}
                                monsterName={monsterName}
                            />
                        );
                    case "status":
                        return (
                            <StatusButton
                                key={`status-${index}`}
                                statusName={parsed.name}
                                passive={passive}
                            />
                        );
                    case "summon":
                        return (
                            <SummonButton
                                key={`summon-${index}`}
                                summonName={parsed.name}
                                quantity={parsed.quantity}
                                perHero={parsed.perHero}
                                action={action}
                                passive={passive}
                                addMonsterCard={addMonsterCard}
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
    const summonRegex = /^summon:(\w+):(\d+)(h?)$/; // capture id, nombre, et éventuellement "h"

    const diceMatch = token.match(diceRegex);
    if (diceMatch) {
        const [, numberDiceRaw, valueDiceRaw, bonusRaw] = diceMatch;
        return {
            type: "dice",
            diceProperty: {
                numberDice: parseInt(numberDiceRaw || "1", 10),
                valueDice: parseInt(valueDiceRaw, 10),
                bonus: bonusRaw ? parseInt(bonusRaw, 10) : 0,
            }
        };
    }

    const statusMatch = token.match(statusRegex);
    if (statusMatch) {
        return { type: "status", name: statusMatch[1] };
    }

    const summonMatch = token.match(summonRegex);
    if (summonMatch) {
        const [, monsterId, rawQuantity, perHeroFlag] = summonMatch;
        return {
            type: "summon",
            name: monsterId,
            quantity: parseInt(rawQuantity, 10),
            perHero: perHeroFlag === 'h',
        };
    }

    return null;
}



export function getDiceImagePath(diceProperty) {
    const value = diceProperty.valueDice;
    return `/dice/d${value}.png`;
}
