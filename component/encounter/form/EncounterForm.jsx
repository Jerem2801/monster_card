'use client';

import { useState, useEffect } from 'react';
import { useEncounterForm } from './hooks/useEncounterForm';
import { getSortedMonsters } from './lib/EncounterFormUtils';
import { loadEncounter } from './lib/EncounterFormQuery';
import EncounterParams from './params/EncounterParams';
import EncounterListMonsters from './listMonsters/EncounterListMonsters';
import EncounterSelectedMonsters from './selectedMonsters/EncounterSelectedMonsters';
import { dataMonsters } from '@/data/monsterdata';

export default function EncounterForm({ encounterId = 0 }) {
    const {
        encounterName,
        setEncounterName,
        selectedMonsters,
        setSelectedMonsters,
        addMonster,
        removeMonster,
        saveEncounter,
    } = useEncounterForm(encounterId);

    const [nbHeroes, setNbHeroes] = useState(1);
    const [levelHeroes, setLevelHeroes] = useState(1);

    const sortedMonsters = getSortedMonsters(dataMonsters);

    useEffect(() => {
        if (!encounterId) return;

        loadEncounter(encounterId, dataMonsters).then(({ encounterName, selectedMonsters }) => {
            setEncounterName(encounterName || '');
            setSelectedMonsters(selectedMonsters || []);
        });
    }, [encounterId]);

    return (
        <div className="pt-8 pr-8 pl-8 lg:pr-80 lg:pl-80">
            <EncounterParams
                encounterName={encounterName}
                nbHeroes={nbHeroes}
                levelHeroes={levelHeroes}
                selectedMonsters={selectedMonsters}
                setEncounterName={setEncounterName}
                setNbHeroes={setNbHeroes}
                setLevelHeroes={setLevelHeroes}
                saveEncounter={saveEncounter}
            />

            <div className="flex h-full w-full flex-col gap-6 md:flex-row">
                <EncounterListMonsters sortedMonsters={sortedMonsters} addMonster={addMonster} />

                <EncounterSelectedMonsters
                    selectedMonsters={selectedMonsters}
                    nbHeroes={nbHeroes}
                    levelHeroes={levelHeroes}
                    removeMonster={removeMonster}
                />
            </div>
        </div>
    );
}
