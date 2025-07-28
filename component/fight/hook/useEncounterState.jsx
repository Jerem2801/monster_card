import { useState, useEffect } from 'react';

export function useEncounterState(encounterId, loadEncounter, dataMonsters) {
    const [monsters, setMonsters] = useState([]);
    const [encounterName, setEncounterName] = useState('Rencontre');
    const [selectedMonsterId, setSelectedMonsterId] = useState(null);

    useEffect(() => {
        async function fetchEncounter() {
            const { selectedMonsters, encounterName } = await loadEncounter(
                encounterId,
                dataMonsters,
            );

            const nameCount = {};
            const monstersWithId = selectedMonsters.map(monster => {
                const baseName = monster.name;
                nameCount[baseName] = (nameCount[baseName] || 0) + 1;
                const nameWithSuffix =
                    nameCount[baseName] > 1 ? `${baseName} ${nameCount[baseName]}` : baseName;

                return {
                    id: crypto.randomUUID(),
                    monster: { ...monster, name: nameWithSuffix },
                    currentHp: monster.hp,
                    ...(monster.legendary ? { currentHpLegendary: monster.last_stand.hp } : {}),
                    status: monster.initStatus ?? [],
                };
            });

            setMonsters(monstersWithId);
            setEncounterName(encounterName ?? 'Rencontre');
        }

        fetchEncounter();
    }, [encounterId, loadEncounter, dataMonsters]);

    const selectedMonster = monsters.find(m => m.id === selectedMonsterId);

    return {
        monsters,
        setMonsters,
        encounterName,
        selectedMonsterId,
        setSelectedMonsterId,
        selectedMonster,
    };
}
