// app/encounter/page.jsx
import Link from 'next/link';

async function getEncounters() {
  const res = await fetch('http://localhost:3000/api/encounter/', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Échec du chargement des rencontres');
  }

  const data = await res.json();
  return data.encounters;
}

export default async function Page() {
  const encounters = await getEncounters();

  return (
    <div className="flex flex-col gap-6 py-8">
      {/* Barre du haut */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Rencontre</h1>
        <Link
          href="/encounter/create"
          className="bg-blue-300 px-6 py-3 rounded-xl hover:bg-blue-100 transition-colors"
        >
          Création
        </Link>
      </div>

      {/* Liste des rencontres */}
      <div className="flex flex-col gap-2">
        {encounters.length === 0 ? (
          <p className="text-gray-500">Aucune rencontre trouvée.</p>
        ) : (
          encounters.map((encounter) => (
            <Link
              key={encounter.id}
              href={`/encounter/${encounter.id}`}
              className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {encounter.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
