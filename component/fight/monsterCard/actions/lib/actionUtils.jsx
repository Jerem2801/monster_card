import { formatDice } from '@/lib/diceutils';
import AttackButton from '../button/AttackButton';
import SummonButton from '../button/SummonButton';
import StatusButton from '../button/StatusButton'; // 👈 Import du bouton de statut

export function getActionContent(action, passive, addMonsterCard, monsterName) {
    const parts = action.description.split(/(\$dice|\$summon|\$status)/); // 👈 Ajout de $status

    return (
        <>
            {parts.map((part, index) => {
                if (part === '$dice') {
                    return (
                        <AttackButton
                            key={`dice-${index}`}
                            diceText={formatDice(action.dice)}
                            action={action}
                            passive={passive}
                            monsterName={monsterName}
                        />
                    );
                } else if (part === '$summon') {
                    return (
                        <SummonButton
                            key={`summon-${index}`}
                            action={action}
                            passive={passive}
                            addMonsterCard={addMonsterCard}
                        />
                    );
                } else if (part === '$status') {
                    return (
                        <StatusButton key={`status-${index}`} action={action} passive={passive} />
                    );
                } else {
                    return <span key={`text-${index}`}>{part}</span>;
                }
            })}
        </>
    );
}

export function getDiceImagePath(action) {
    const value = action.dice.valueDice;
    return `/dice/d${value}.png`;
}
