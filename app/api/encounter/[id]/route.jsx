
import { jsonResponse, errorResponse } from '@/app/lib/api';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function GET(req) {
  const id = req.nextUrl.pathname.split('/').pop();
    try {
        const rows = await sql`SELECT e.name, ed.nom_monstre, ed.nombre_monstre FROM encounter e JOIN encounter_detail ed ON e.id = ed.encounter_id WHERE e.id = ${id}`;
        if (rows.length === 0) {
        return errorResponse(new Error("Rencontre introuvable"), 404);
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

export async function DELETE(req) {
  try {
    // Récupère l'id depuis l'URL (Next.js 13 route handlers)
    const { searchParams } = new URL(req.url);
    const encounterId = searchParams.get('id');

    if (!encounterId) {
      return errorResponse(new Error('ID de rencontre manquant'), 400);
    }

    await sql`DELETE FROM encounter WHERE id = ${encounterId}`;

    return jsonResponse({ success: true, message: "Rencontre supprimée avec succès" });
  } catch (error) {
    return errorResponse(error);
  }
}
