'use client';

import Link from 'next/link';
import { Button } from 'flowbite-react';
import { PencilSquareIcon, XCircleIcon, PlayCircleIcon } from '@heroicons/react/16/solid';
import { fetchApi } from '@/lib/api';
import { useState, useEffect } from 'react';

export default function Page() {
    const [encounters, setEncounters] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const handleDelete = async id => {
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
        <div className="flex flex-col gap-6 pt-8 pr-8 pl-8 lg:pr-80 lg:pl-80">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Rencontre</h1>
				<Link href="/encounter/create">
					<Button>
						Nouvelle
					</Button>
				</Link>
            </div>

            <div className="flex flex-col gap-4">
                {encounters.length === 0 ? (
                    <p className="text-gray-500">Aucune rencontre trouvée.</p>
                ) : (
                    encounters.map(encounter => (
                        <div
                            className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm transition-colors hover:bg-gray-200"
                            key={encounter.id}
                        >
                            <div className="pl-10 text-xl font-bold">{encounter.name}</div>

                            <div className="flex gap-2 pr-10">
                                <Link href={`/fight/${encounter.id}`}>
                                    <Button>
                                        <PlayCircleIcon className="h-5 w-5" />
                                    </Button>
                                </Link>

                                <Link href={`/encounter/${encounter.id}`}>
                                    <Button color="green">
                                        <PencilSquareIcon className="h-5 w-5" />
                                    </Button>
                                </Link>

                                <Button color="red" onClick={() => handleDelete(encounter.id)}>
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
