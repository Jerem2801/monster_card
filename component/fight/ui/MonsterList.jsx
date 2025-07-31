import SimpleCard from './simpleCard/SimpleCard';

export default function MonsterList({
    monsters,
    modifiedMonsters,
    selectedMonsterId,
    setSelectedMonsterId,
    deleteMode,
    updateMonsterHp,
    updateMonsterHpLegendary,
    updateMonsterStatus,
    updateMonster,
    deleteMonster,
}) {
    return (
        <div className="flex-[1.3] overflow-y-auto bg-white">
            <div className="p-4">
                {monsters.map(({ id, monster, currentHp, currentHpLegendary, status }) => {
                    const modifiedMonster = modifiedMonsters[id] || monster;
                    return (
                        <SimpleCard
                            key={id}
                            monster={modifiedMonster}
                            currentHp={currentHp}
                            currentHpLegendary={currentHpLegendary}
                            status={status}
                            onSelect={() => setSelectedMonsterId(id)}
                            onHpChange={newHp =>
                                updateMonsterHp(id, newHp, modifiedMonster.legendary)
                            }
                            onHpLegendaryChange={newHp => updateMonsterHpLegendary(id, newHp)}
                            selected={selectedMonsterId === id}
                            deleteMode={deleteMode}
                            onDelete={() => deleteMonster(id)}
                            updateMonsterStatus={newStatusList =>
                                updateMonsterStatus(id, newStatusList)
                            }
                            updateMonster={fields => updateMonster(id, fields)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
