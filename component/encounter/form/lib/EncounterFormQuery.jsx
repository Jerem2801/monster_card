import { fetchApi } from '@/lib/api';

export async function isExisting(encounterId, encounterName) {
    const { encounters = [] } = await fetchApi('/api/encounter/');

    const nameAlreadyExists = encounters.some(
        encounter => encounter.name === encounterName && encounter.id !== Number(encounterId),
    );

    if (nameAlreadyExists) {
        alert('Une rencontre avec ce nom existe déjà');
        return true;
    }

    return false;
}

export async function saveEncounterInDB(encounterId, name, encounter) {
    const isUpdate = !!encounterId;

    const url = isUpdate ? `/api/encounter/${encounterId}` : `/api/encounter`;

    const method = isUpdate ? 'PUT' : 'POST';
    
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            encounterId: isUpdate ? encounterId : null,
            name,
            encounter,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'enregistrement de la rencontre");
    }

    return response.json();
}

export async function loadEncounter(encounterId, dataMonsters) {
    try {
        const res = await fetch(`/api/encounter/${encounterId}`);
        if (!res.ok) throw new Error('Erreur chargement rencontre');
        const datas = await res.json();

        const monstersLoaded = [];
        datas.encounter.forEach(data => {
            const baseMonster = dataMonsters.find(m => m.id === data.monster_id);
            if (baseMonster) {
                for (let i = 0; i < data.monster_number; i++) {
                    monstersLoaded.push(baseMonster);
                }
            }
        });

        return {
            encounterName: datas.name || '',
            selectedMonsters: monstersLoaded,
        };
    } catch (error) {
        console.error(error);
    }
}
