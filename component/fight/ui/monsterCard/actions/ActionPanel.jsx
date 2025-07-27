import Actions from './Actions';

export default function ActionPanel({ monster, addMonsterCard, status }) {
    return (
        <div className="relative inline-block space-y-2 pb-6">
            {monster.action.map(action => (
                <Actions
                    key={action.name}
                    action={action}
                    addMonsterCard={addMonsterCard}
                    monsterName={monster.name}
                    status={status}
                />
            ))}
        </div>
    );
}
