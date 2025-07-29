import MonsterCard from './monsterCard/MonsterCard';

export default function MonsterDetail({
    selectedMonster,
    modifiedMonsters,
    addMonsterCard,
    updateMonsterStatus,
    updateMonster,
    nbHeroes
}) {
    return (
        <div className="flex-[1.5] space-y-6 overflow-hidden p-10">
            {selectedMonster ? (
                <MonsterCard
                    monster={modifiedMonsters[selectedMonster.id] || selectedMonster.monster}
                    addMonsterCard={addMonsterCard}
                    status={selectedMonster.status}
                    updateMonsterStatus={newStatusList =>
                        updateMonsterStatus(selectedMonster.id, newStatusList)
                    }
                    updateMonster={fields => updateMonster(selectedMonster.id, fields)}
                    nbHeroes={nbHeroes}
                />
            ) : (
                <div className="text-center text-gray-500 italic">
                    Sélectionnez un monstre pour voir les détails
                </div>
            )}
        </div>
    );
}
