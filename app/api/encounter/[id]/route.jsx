import { jsonResponse, errorResponse } from '@/lib/api';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function GET(_, { params }) {
    try {
        const { id: encounterId } = await params;
        const rows =
            await sql`SELECT e.name, ed.nom_monstre, ed.nombre_monstre FROM encounter e JOIN encounter_detail ed ON e.id = ed.encounter_id WHERE e.id = ${encounterId}`;
        if (rows.length === 0) {
            return errorResponse(new Error('Rencontre introuvable'), 404);
        }

        const name = rows[0].name;

        const encounter = rows.map(row => ({
            nom_monstre: row.nom_monstre,
            nombre_monstre: row.nombre_monstre,
        }));

        return jsonResponse({ name, encounter });
    } catch (error) {
        return errorResponse(error);
    }
}

export async function DELETE(_, { params }) {
    try {
        const { id: encounterId } = await params;

        if (!encounterId) {
            return errorResponse(new Error('ID de rencontre manquant'), 400);
        }

        await sql`DELETE FROM encounter WHERE id = ${encounterId}`;

        return jsonResponse({ success: true, message: 'Rencontre supprimée avec succès' });
    } catch (error) {
        return errorResponse(error);
    }
}

// PUT - mettre à jour
export async function PUT(req) {
    const body = await req.json();
    const { encounterId, name, encounter } = body;

    if (!encounterId) {
        return errorResponse(new Error('ID de rencontre manquant pour mise à jour'), 400);
    }
    if (!name || !Array.isArray(encounter) || encounter.length === 0) {
        return errorResponse(new Error('Nom ou détails manquants'), 400);
    }

    await sql`UPDATE encounter SET name = ${name} WHERE id = ${encounterId}`;
    await sql`DELETE FROM encounter_detail WHERE encounter_id = ${encounterId}`;

    for (const detail of encounter) {
        await sql`
      INSERT INTO encounter_detail (encounter_id, nom_monstre, nombre_monstre)
      VALUES (${encounterId}, ${detail.nom_monstre}, ${detail.nombre_monstre})
    `;
    }

    return jsonResponse({ success: true, id: encounterId });
}
