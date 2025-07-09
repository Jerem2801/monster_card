'use client';

import Link from 'next/link';
import SimpleLink from '@/ui/simple/SimpleLink';
import SimpleButton from '@/ui/simple/SimpleButton';
import { Button}  from 'flowbite-react';
import { PencilSquareIcon,XCircleIcon,PlayCircleIcon } from '@heroicons/react/16/solid';
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
      const data = await fetchApi('/api/encounter/');
      setEncounters(data.encounters);
    }
    loadEncounters();
  }, [refresh]);

  return (
    <div className="flex flex-col gap-6 p-8 pl-80 pr-80">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">Rencontre</h1>
        <SimpleLink href="/encounter/create" name="Nouvelle" />

      </div>

      <div className="flex flex-col gap-4">
        
        {encounters.length === 0 ? (
          <p className="text-gray-500">Aucune rencontre trouvée.</p>
        ) : (
          encounters.map((encounter) => (
            <div
              className="flex justify-between items-center p-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-colors"
              key={encounter.id}
            >
              <div className="pl-10 text-xl font-bold">
                <Link
                  href={`/encounter/${encounter.id}`}
                >
                  {encounter.name}
                </Link>
              </div> 

              
            <div className="flex gap-2 pr-10">
              <Link href={`/fight/${encounter.id}`}>
                <Button>
                  <PlayCircleIcon className="h-5 w-5" />
                </Button>
              </Link>

              <Link href={`/encounter/${encounter.id}`}>
                <Button
                  color='green'>
                  <PencilSquareIcon className="h-5 w-5" />
                </Button>
              </Link>

              <Button
                  color='red'
                  onClick={() => handleDelete(encounter.id)} >
                  <XCircleIcon className="h-5 w-5" />
                </Button>

            </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
