'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { Button } from 'flowbite-react';

import { useEncounterPage } from './hooks/useEncounterPage';
import EncounterList from './ui/EncounterList';

import LoadingWrapper from '@/ui/LoadingWrapper';

export default function EncounterListPage() {
    const { encounters, refresh, isLoading, loadEncounters, handleDelete } = useEncounterPage();

    useEffect(() => {
        loadEncounters();
    }, [loadEncounters, refresh]);

    return (
        <div className="flex flex-col gap-6 px-80 pt-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Rencontre</h1>
                <Link href="/encounter/create">
                    <Button>Nouvelle</Button>
                </Link>
            </div>

            <LoadingWrapper isLoading={isLoading}>
                <EncounterList encounters={encounters} handleDelete={handleDelete} />
            </LoadingWrapper>
        </div>
    );
}
