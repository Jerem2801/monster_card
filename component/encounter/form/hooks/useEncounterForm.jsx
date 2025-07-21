import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { dataMonsters } from '@/data/monsterdata';

import { getMonsterToSave } from '../lib/EncounterFormUtils';
import { isExisting, saveEncounterInDB } from '../lib/EncounterFormQuery';

export function useEncounterForm(encounterId = 0) {
    const router = useRouter();

    const [encounterName, setEncounterName] = useState('');
    const [selectedMonsters, setSelectedMonsters] = useState([]);

    const addMonster = useCallback(monsterId => {
        const monster = dataMonsters.find(m => m.id === monsterId);
        if (monster) {
            setSelectedMonsters(prev => [...prev, monster]);
        }
    }, []);

    const removeMonster = useCallback(index => {
        setSelectedMonsters(prev => {
            const newSelected = [...prev];
            newSelected.splice(index, 1);
            return newSelected;
        });
    }, []);

    const saveEncounter = useCallback(async () => {
        const name = encounterName.trim();
        if (await isExisting(encounterId, name)) return;
        
        try {
            const details = getMonsterToSave(selectedMonsters);
            saveEncounterInDB(encounterId, name, details);
            router.push('/encounter');
        } catch (err) {
            console.error("Erreur d'enregistrement :", err);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    }, [encounterId, encounterName, selectedMonsters, router]);

    return {
        encounterName,
        setEncounterName,
        selectedMonsters,
        setSelectedMonsters,
        addMonster,
        removeMonster,
        saveEncounter,
    };
}
