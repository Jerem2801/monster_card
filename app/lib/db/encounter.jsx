import { fetchApi } from '@/app/lib/api'


export async function checkExisting(encounterId, name) {
    const data = await fetchApi('http://localhost:3000/api/encounter/');
    const encounters = data.encounters;

    if (!Array.isArray(encounters) || encounters.length === 0) {
        return false; // Aucun enregistrement → nom forcément libre
    }

    const exist = encounters.find(
        encounter => encounter.name === name && encounter.id !== Number(encounterId)
    );

  
    return !!exist;
}
