import Actions from './Actions';

export default function ActionPanel({ monster, addMonsterCard,status }) {
    return (
        <div className="relative inline-block pb-6 space-y-2">
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
