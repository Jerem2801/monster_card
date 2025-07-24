import { useState, useEffect } from 'react';
import { dataMonsters } from '@/data/monsterdata';
import { MessagesProvider } from '@/component/fight/resultDisplay/MessagesProvider';
import { loadEncounter } from '@/component/encounter/form/lib/EncounterFormQuery';
import ResultDisplayDialogBox from '@/component/fight/resultDisplay/ResultDisplayDialogBox';
import SimpleCard from './simpleCard/SimpleCard';
import MonsterCard from './monsterCard/MonsterCard';
import FightHeader from './FightHeader';
import {BLOODIED,DEAD} from '@/data/statusdata'

export default function Fight({ encounterId }) {
    const [selectedMonsterId, setSelectedMonsterId] = useState(null);
    const [monsters, setMonsters] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [encounterName, setEncounterName] = useState('Rencontre');

    const selectedMonster = monsters.find(m => m.id === selectedMonsterId);

    function updateMonster(id, updatedFields) {
        setMonsters(prev =>
            prev.map(m =>
                m.id === id
                    ? {
                        ...m,
                        monster: {
                            ...m.monster,
                            ...updatedFields,
                        },
                    }
                    : m,
            ),
        );
    }

    useEffect(() => {
        async function fetchEncounter() {
            const { selectedMonsters, encounterName } = await loadEncounter(
                encounterId,
                dataMonsters,
            );

            const monstersWithId = selectedMonsters.map(monster => ({
                id: crypto.randomUUID(),
                monster,
                currentHp: monster.hp,
                status: monster.initStatus ?? [],
            }));

            setMonsters(monstersWithId);
            setEncounterName(encounterName ?? 'Rencontre');
        }

        fetchEncounter();
    }, [encounterId]);

    function updateMonsterHp(id, newHp) {
        setMonsters(prev =>
            prev.map(m => {
                if (m.id !== id) return m;

                const maxHp = m.monster.hp;
                const clampedHp = Math.max(0, Math.min(newHp, maxHp));
                const isMidLife = clampedHp > 0 && clampedHp <= maxHp / 2;
                const isDead = clampedHp === 0;

                let newStatus = [...m.status].filter(
                    s => s.id !== BLOODIED.id && s.id !== DEAD.id
                );

                if (isDead) {
                    newStatus.push(DEAD);
                } else if (isMidLife) {
                    newStatus.push(BLOODIED);
                }

                return {
                    ...m,
                    currentHp: clampedHp,
                    status: newStatus,
                };
            })
        );
    }

    function updateMonsterStatus(id, newStatusList) {
        setMonsters(prev => prev.map(m => (m.id === id ? { ...m, status: newStatusList } : m)));
    }

    function removeStatusFromMonster(id, statusId) {
        setMonsters(prev =>
            prev.map(m =>
                m.id === id ? { ...m, status: m.status.filter(s => s.id !== statusId) } : m,
            ),
        );
    }

    function addStatusToMonster(id, status) {
        setMonsters(prev =>
            prev.map(m =>
                m.id === id && !m.status.some(s => s.id === status.id)
                    ? { ...m, status: [...m.status, status] }
                    : m,
            ),
        );
    }

    function addMonsterCard(baseMonster, quantity = 1) {
        if (!baseMonster || quantity <= 0) return;

        const newMonsters = Array.from({ length: quantity }, () => ({
            id: crypto.randomUUID(),
            monster: baseMonster,
            currentHp: baseMonster.hp,
            status: [],
        }));

        setMonsters(prev => [...prev, ...newMonsters]);
    }

    function deleteMonster(id) {
        setMonsters(prev => prev.filter(m => m.id !== id));
        if (selectedMonster?.id === id) {
            setSelectedMonsterId(null);
        }
    }

    return (
        <MessagesProvider>
            <div className="relative flex h-[calc(100vh-5rem)] overflow-hidden">
                {/* Liste à gauche */}
                <div className="w-1/3 overflow-y-auto border-r border-gray-200 bg-white">
                    {/* Header uniquement au-dessus de la liste */}
                    <FightHeader
                        deleteMode={deleteMode}
                        encounterName={encounterName}
                        setDeleteMode={setDeleteMode}
                    />

                    {/* Liste des cartes */}
                    <div className="p-4">
                        {monsters.map(({ id, monster, currentHp, status }) => (
                            <SimpleCard
                                key={id}
                                monster={monster}
                                currentHp={currentHp}
                                status={status}
                                onSelect={() =>
                                    setSelectedMonsterId(id)
                                }
                                onHpChange={newHp => updateMonsterHp(id, newHp)}
                                selected={selectedMonster?.id === id}
                                deleteMode={deleteMode}
                                onDelete={() => deleteMonster(id)}
                                updateMonsterStatus={newStatusList =>
                                    updateMonsterStatus(id, newStatusList)
                                }
                                updateMonster={fields => updateMonster(selectedMonster.id, fields)}
                            />
                        ))}
                    </div>
                </div>

                {/* Carte à droite */}
                <div className="w-2/3 space-y-6 overflow-hidden p-6">
                    {selectedMonster && (
                        <MonsterCard
                            monster={selectedMonster.monster}
                            addMonsterCard={addMonsterCard}
                            status={selectedMonster.status}
                            updateMonsterStatus={newStatusList =>
                                    updateMonsterStatus(selectedMonster.id, newStatusList)
                                }
                            updateMonster={fields => updateMonster(selectedMonster.id, fields)}
                        />
                    )}

                    <ResultDisplayDialogBox />
                </div>
            </div>
        </MessagesProvider>
    );
}
