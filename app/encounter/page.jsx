'use client';

import Link from 'next/link';
import { Button } from 'flowbite-react';
import EncounterList from '@/ui/encounter/EncounterList';
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
                    <Button className="cursor-pointer">Nouvelle</Button>
                </Link>
            </div>

            <EncounterList encounters={encounters} handleDelete={handleDelete} />
        </div>
    );
}
