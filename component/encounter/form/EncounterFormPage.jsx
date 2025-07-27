'use client';

import { useState, useEffect } from 'react';

import { dataMonsters } from '@/data/monsterdata';

import { useEncounterForm } from './hooks/useEncounterForm';

import { getSortedMonsters } from './lib/EncounterFormUtils';
import { loadEncounter } from './lib/EncounterFormQuery';

import EncounterParams from './ui/params/EncounterParams';
import EncounterListMonsters from './ui/listMonsters/EncounterListMonsters';
import EncounterSelectedMonsters from './ui/selectedMonsters/EncounterSelectedMonsters';

export default function EncounterFormPage({ encounterId = 0 }) {
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
        <div className="pt-8 pr-8 pl-8 lg:pr-80 lg:pl-70">
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

            <div className="flex h-[calc(100vh-14rem)] w-full flex-col gap-6 md:flex-row">
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
