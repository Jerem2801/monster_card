'use client';

import { useEffect, useState } from 'react';
import MonsterCard from '@/component/monster-card/MonsterCard';
import { dataMonsters } from '@/data/monsterdata';
import { loadEncounter } from '@/lib/encounterUtils';

export default function MonsterPage({ encounterId }) {
    const [monsters, setMonsters] = useState([]);
    const [encounterName, setEncounterName] = useState('');

    // Charge les monstres depuis l'API + dataMonsters
    useEffect(() => {
        if (!encounterId) return;

        async function fetchEncounter() {
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
                console.error('Erreur lors du chargement de la rencontre:', err);
            }
        }

        fetchEncounter();
    }, [encounterId]);

    function removeMonster(idToRemove) {
        setMonsters(prev => prev.filter(m => m.id !== idToRemove));
    }

    function addMonster(monster) {
        setMonsters(prev => [
            ...prev,
            {
                id: crypto.randomUUID(),
                monster: monster,
            },
        ]);
    }

    return (
  <div className="px-8">
    <h1 className="pt-8 text-2xl font-bold">Rencontre : {encounterName}</h1>

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
