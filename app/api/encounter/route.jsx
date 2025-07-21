import { jsonResponse, errorResponse } from '@/lib/api';
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
        const { name, encounter } = await req.json();


        if (!name || !Array.isArray(encounter) || encounter.length === 0) {
            return errorResponse(new Error('Nom ou détails manquants'), 400);
        }

        // Création de la rencontre
        const [{ id: newId }] = await sql`
            INSERT INTO encounter (name)
            VALUES (${name})
            RETURNING id
        `;

        // Construction des valeurs à insérer pour un INSERT multiple
        const values = encounter
            .map(d => `(${newId}, '${d.monster_id}', ${d.monster_number})`)
            .join(', ');

        await sql.unsafe(`
            INSERT INTO encounter_detail (encounter_id, monster_id, monster_number)
            VALUES ${values}
        `);

        return jsonResponse({ success: true, id: newId });
    } catch (err) {
        console.error(err);
        return errorResponse(new Error('Erreur serveur'), 500);
    }
}
