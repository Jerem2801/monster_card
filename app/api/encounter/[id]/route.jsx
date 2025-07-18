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
    try {
        const { encounterId, name, encounter } = await req.json();

        // Validation
        if (!encounterId) {
            return errorResponse(new Error('ID de rencontre manquant pour mise à jour'), 400);
        }
        if (!name?.trim() || !Array.isArray(encounter) || encounter.length === 0) {
            return errorResponse(new Error('Nom ou détails manquants'), 400);
        }

        // Transaction : sécurise tout ou rien
        await sql.begin(async tx => {
            await tx`UPDATE encounter SET name = ${name.trim()} WHERE id = ${encounterId}`;
            await tx`DELETE FROM encounter_detail WHERE encounter_id = ${encounterId}`;

            // Insertion groupée des détails
            const insertValues = encounter
                .map(
                    ({ nom_monstre, nombre_monstre }) =>
                        `(${encounterId}, '${nom_monstre}', ${nombre_monstre})`,
                )
                .join(',');

            await tx.unsafe(`
        INSERT INTO encounter_detail (encounter_id, nom_monstre, nombre_monstre)
        VALUES ${insertValues}
      `);
        });

        return jsonResponse({ success: true, id: encounterId });
    } catch (err) {
        console.error('Erreur PUT /encounter:', err);
        return errorResponse(new Error('Échec de la mise à jour de la rencontre'), 500);
    }
}
