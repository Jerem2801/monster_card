import { formatDice } from '@/lib/diceutils';
import AttackButton from '@/ui/monsterCard/actions/AttackButton';

export function getActionContent(action) {
    if (!action.description.includes('$dice')) {
        return <span>{action.description}</span>;
    }

    const [before, after] = action.description.split('$dice');
    const diceText = formatDice(action.dice);

    return (
        <>
            <span>{before}</span>
            <AttackButton diceText={diceText} action={action}/>
            <span>{after}</span>
        </>
    );
}
