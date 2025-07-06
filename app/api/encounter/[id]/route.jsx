import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const details = await sql`
      SELECT * FROM encounter_detail WHERE encounter_id = ${id}
    `;
    return new Response(JSON.stringify({ details }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}
