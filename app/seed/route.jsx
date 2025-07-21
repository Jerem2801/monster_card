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
    { id: 1, encounter_id: 1, monster_id: 'goblin', monster_number: 5 },
    { id: 2, encounter_id: 1, monster_id: 'kobold', monster_number: 3 },
    { id: 3, encounter_id: 2, monster_id: 'greenthumb', monster_number: 1 },
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
      monster_id VARCHAR(255) NOT NULL,
      monster_number INT NOT NULL
    );
  `;
}

async function createEncounter() {
    const insertedEncounters = await Promise.all(
        encounters.map(
            encounter =>
                sql`
        INSERT INTO encounter (id, name)
        VALUES (${encounter.id}, ${encounter.name})
        ON CONFLICT (id) DO NOTHING;
      `,
        ),
    );
    return insertedEncounters;
}

async function createEncounterDetail() {
    const insertedEncounterDetails = await Promise.all(
        encounterDetails.map(
            detail =>
                sql`
        INSERT INTO encounter_detail (id, encounter_id, monster_id, monster_number)
        VALUES (${detail.id}, ${detail.encounter_id}, ${detail.monster_id}, ${detail.monster_number})
        ON CONFLICT (id) DO NOTHING;
      `,
        ),
    );
    return insertedEncounterDetails;
}

export async function GET() {
    try {
        await sql.begin(async sql => {
            await createTables();
            await createEncounter();
            await createEncounterDetail();
        });

        return new Response(JSON.stringify({ message: 'Database seeded successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
