import Actions from '@/component/monster-card/actions/Actions';

export default function ActionPanel({ monster, addMonsterCard }) {
    return (
        <div className="relative inline-block">
            {monster.action.map(action => (
                <Actions key={action.name} action={action} addMonsterCard={addMonsterCard} monsterName={monster.name}/>
            ))}
        </div>
    );
}
