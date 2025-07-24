import Actions from './Actions';

export default function ActionPanel({ monster, addMonsterCard,status }) {
    return (
        <div className="relative inline-block">
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
