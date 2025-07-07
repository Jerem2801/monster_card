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
  const body = await req.json();
  const { name, encounter } = body;

  if (!name || !Array.isArray(encounter) || encounter.length === 0) {
    return errorResponse(new Error("Nom ou détails manquants"), 400);
  }

  const inserted = await sql`INSERT INTO encounter (name) VALUES (${name}) RETURNING id`;
  const newId = inserted[0]?.id;

  for (const detail of encounter) {
    await sql`
      INSERT INTO encounter_detail (encounter_id, nom_monstre, nombre_monstre)
      VALUES (${newId}, ${detail.nom_monstre}, ${detail.nombre_monstre})
    `;
  }

  return jsonResponse({ success: true, id: newId });
}



