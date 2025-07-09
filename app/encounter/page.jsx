'use client';

import Link from 'next/link';
import SimpleLink from '@/ui//simple/SimpleLink';
import SimpleButton from '@/ui/simple/SimpleLink';
import { fetchApi } from '@/lib/api';
import { useState, useEffect } from 'react';

export default function Page() {
  const [encounters, setEncounters] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/encounter/${id}?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setRefresh(!refresh);
    } else {
      alert('Erreur lors de la suppression de la rencontre');
    }
  };

  useEffect(() => {
    async function loadEncounters() {
      const data = await fetchApi('http://localhost:3000/api/encounter/');
      setEncounters(data.encounters);
    }
    loadEncounters();
  }, [refresh]);

  return (
    <div className="flex flex-col gap-6 py-8">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">Rencontre</h1>
        <SimpleLink href="/encounter/create" name="Nouvelle" />

      </div>

      <div className="flex flex-col gap-2">
        
        {encounters.length === 0 ? (
          <p className="text-gray-500">Aucune rencontre trouvée.</p>
        ) : (
          encounters.map((encounter) => (
            <div
              className="p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              key={encounter.id}
            >
              <Link
                href={`/encounter/${encounter.id}`}
              >
                {encounter.name}
              </Link>

              <SimpleButton
                label="Supprimer"
                onClick={() => handleDelete(encounter.id)}
              />

            </div>
          ))
        )}
      </div>
    </div>
  );
}
