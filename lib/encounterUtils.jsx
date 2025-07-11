import { fetchApi } from '@/lib/api';

async function checkExisting(encounterId, name) {
    const data = await fetchApi('/api/encounter/');
    const encounters = data.encounters;
    if (!Array.isArray(encounters) || encounters.length === 0) {
        return false;
    }
    const exist = encounters.find(
        encounter => encounter.name === name && encounter.id !== Number(encounterId),
    );
    return !!exist;
}

export async function isGoodBeforeSaveEncounter(encounterId, encounterName, selectedMonsters) {
    if (!encounterName) {
        alert('Veuillez donner un nom à la rencontre');
        return false;
    }
    if (selectedMonsters.length === 0) {
        alert('Veuillez ajouter au moins un monstre à la rencontre');
        return false;
    }
    if (await checkExisting(encounterId, encounterName)) {
        alert('Une rencontre avec ce nom existe déjà');
        return false;
    }
    return true;
}

export function getMonsterToSave(selectedMonsters) {
    return selectedMonsters.reduce((acc, monster) => {
        const existing = acc.find(item => item.nom_monstre === monster.name);
        if (existing) {
            existing.nombre_monstre += 1; // Incrémente le nombre si déjà présent
        } else {
            acc.push({ nom_monstre: monster.name, nombre_monstre: 1 });
        }
        return acc;
    }, []);
}

export async function saveOrUpdateEncounter(encounterId, name, encounter) {
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
            const baseMonster = dataMonsters.find(m => m.name === data.nom_monstre);
            if (baseMonster) {
                for (let i = 0; i < data.nombre_monstre; i++) {
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
