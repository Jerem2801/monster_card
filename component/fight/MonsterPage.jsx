'use client';

import { useEffect, useState, useCallback } from 'react';

import { dataMonsters } from '@/data/monsterdata';

import MonsterCard from './monsterCard/MonsterCard';

import { loadEncounter } from '@/component/encounter/form/lib/EncounterFormQuery';

export default function MonsterPage({ encounterId }) {
    const [encounterName, setEncounterName] = useState('');
    const [monsters, setMonsters] = useState([]);

    // 🔄 Chargement initial
    useEffect(() => {
        if (!encounterId) return;

        const fetchEncounter = async () => {
            try {
                const { encounterName, selectedMonsters } = await loadEncounter(
                    encounterId,
                    dataMonsters,
                );

                const monstersWithId = selectedMonsters.map(monster => ({
                    id: crypto.randomUUID(),
                    monster,
                }));

                setEncounterName(encounterName || '');
                setMonsters(monstersWithId);
            } catch (err) {
                console.error('Erreur lors du chargement de la rencontre :', err);
            }
        };

        fetchEncounter();
    }, [encounterId]);

    // 🧼 Mémoïsation pour éviter les re-rendus inutiles
    const removeMonster = useCallback(
        idToRemove => {
            setMonsters(prev => prev.filter(m => m.id !== idToRemove));
        },
        [setMonsters],
    );

    const addMonster = useCallback(
        monster => {
            setMonsters(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    monster,
                },
            ]);
        },
        [setMonsters],
    );

    return (
        <div className="px-8">
            <h1 className="pt-8 text-center text-3xl font-bold">
                <span>{encounterName}</span>
            </h1>

            <div className="flex flex-wrap justify-center gap-10 pt-8">
                {monsters.map(({ id, monster }) => (
                    <MonsterCard
                        key={id}
                        monster={monster}
                        addMonsterCard={addMonster}
                        removeMonsterCard={() => removeMonster(id)}
                    />
                ))}
            </div>
        </div>
    );
}
