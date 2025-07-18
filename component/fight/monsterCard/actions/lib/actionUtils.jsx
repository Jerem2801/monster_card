import { formatDice } from '@/lib/diceutils';
import AttackButton from '../AttackButton';
import SummonButton from '../SummonButton'; // à adapter selon ton chemin

export function getActionContent(action, passive, addMonsterCard, monsterName) {
    const parts = action.description.split(/(\$dice|\$summon)/); // coupe autour des tokens spéciaux
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
                } else {
                    return <span key={`text-${index}`}>{part}</span>;
                }
            })}
        </>
    );
}
