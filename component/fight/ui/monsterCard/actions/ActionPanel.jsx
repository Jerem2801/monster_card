import Actions from './Actions';

export default function ActionPanel({ monster, addMonsterCard, status,nbHeroes }) {
    return (
        <div className="relative inline-block space-y-2">
            {monster.action.map(action => (
                <Actions
                    key={action.name}
                    action={action}
                    addMonsterCard={addMonsterCard}
                    monsterName={monster.name}
                    status={status}
                    isMinion={monster.minion}
                    nbHeroes={nbHeroes}
                />
            ))}
        </div>
    );
}
