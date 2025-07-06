import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

const encounters = [
  { id: 1, name: 'Goblin Ambush' },
  { id: 2, name: 'Bandit Raid' },
  { id: 3, name: 'Dragon Attack' },
  { id: 4, name: 'Undead Horde' },
  { id: 5, name: 'Elemental Storm' },
];

const encounterDetails = [
  { id: 1, encounter_id: 1, nom_monstre: 'Goblin', nombre_monstre: 5 },
  { id: 2, encounter_id: 1, nom_monstre: 'Kobold', nombre_monstre: 3 },
  { id: 3, encounter_id: 2, nom_monstre: 'Greenthumb', nombre_monstre: 1 },
];

async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS encounter (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS encounter_detail (
      id SERIAL PRIMARY KEY,
      encounter_id INT NOT NULL REFERENCES encounter(id) ON DELETE CASCADE,
      nom_monstre VARCHAR(255) NOT NULL,
      nombre_monstre INT NOT NULL
    );
  `;
}

async function createEncounter() {
  const insertedEncounters = await Promise.all(
    encounters.map((encounter) =>
      sql`
        INSERT INTO encounter (id, name)
        VALUES (${encounter.id}, ${encounter.name})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
  return insertedEncounters;
}

async function createEncounterDetail() {
  const insertedEncounterDetails = await Promise.all(
    encounterDetails.map((detail) =>
      sql`
        INSERT INTO encounter_detail (id, encounter_id, nom_monstre, nombre_monstre)
        VALUES (${detail.id}, ${detail.encounter_id}, ${detail.nom_monstre}, ${detail.nombre_monstre})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
  return insertedEncounterDetails;
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await createTables();
      await createEncounter();
      await createEncounterDetail();
    });

    return new Response(
      JSON.stringify({ message: 'Database seeded successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
