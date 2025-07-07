import { jsonResponse, errorResponse } from '@/app/lib/api';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function GET() {
  try {
    const rows = await sql`SELECT id, name FROM encounter ORDER BY id`;
    return jsonResponse({ encounters: rows });
  } catch (error) {
    return errorResponse(error);
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { encounterId, name, encounter } = body;
    if (!name || !Array.isArray(encounter) || encounter.length === 0) {
      return errorResponse(new Error("Nom ou détails de rencontre manquants"), 400);
    }

    let newId = null;
    if(encounterId){
        // Mise à jour de la rencontre existante
        await sql`
            UPDATE encounter SET name = ${name} WHERE id = ${encounterId}
        `;
        // Suppression des détails existants
        await sql`
            DELETE FROM encounter_detail WHERE encounter_id = ${encounterId}
        `;
        newId = encounterId;
    }else {
        // Création de la rencontre principale
        const inserted = await sql`INSERT INTO encounter (name) VALUES (${name}) RETURNING id`;
        newId = inserted[0]?.id;
        if (!newId) {
            return errorResponse(new Error("Erreur lors de la création de la rencontre"), 500);
        }
    }
 
    
    // Insertion des détails (monstres)
    for (const detail of encounter) {
      await sql`
        INSERT INTO encounter_detail (encounter_id, nom_monstre, nombre_monstre)
        VALUES (${newId}, ${detail.nom_monstre}, ${detail.nombre_monstre})
      `;
    }

    return jsonResponse({ success: true, id: newId });
  } catch (error) {
    return errorResponse(error);
  }
}
