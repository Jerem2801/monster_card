'use client';

import { useEffect} from 'react';

import Link from 'next/link';
import { Button} from 'flowbite-react';

import { useEncounters } from './hooks/useEncounterPage';

import EncounterList from './EncounterList';
import LoadingWrapper from '@/ui/LoadingWrapper';

export default function EncounterPage() {
    const { encounters, refresh, isLoading, loadEncounters, handleDelete } = useEncounters();

    useEffect(() => {
        loadEncounters();
    }, [loadEncounters, refresh]);

    return (
        <div className="flex flex-col gap-6 pt-8 pr-8 pl-8 lg:pr-80 lg:pl-80">

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
