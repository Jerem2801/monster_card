import SimpleCard from './simpleCard/SimpleCard';
import FightHeader from './FightHeader';

export default function MonsterList({
    monsters,
    modifiedMonsters,
    selectedMonsterId,
    setSelectedMonsterId,
    deleteMode,
    setDeleteMode,
    encounterName,
    updateMonsterHp,
    updateMonsterHpLegendary,
    updateMonsterStatus,
    updateMonster,
    deleteMonster,
}) {
    return (
        <div className="flex-[1.3] overflow-y-auto border-r border-gray-200 bg-white">
            <FightHeader
                deleteMode={deleteMode}
                encounterName={encounterName}
                setDeleteMode={setDeleteMode}
            />
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
