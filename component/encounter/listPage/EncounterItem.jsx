import Link from 'next/link';
import { Button } from 'flowbite-react';
import { PencilSquareIcon, XCircleIcon, PlayCircleIcon } from '@heroicons/react/16/solid';

export default function EncounterItem({ encounter, handleDelete }) {
return (
    <div className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm">
        <div className="pl-10 text-xl font-bold select-none">{encounter.name}</div>
        <div className="flex gap-2 pr-10">

            <Link href={`/fight/${encounter.id}`}>
                <Button className="cursor-pointer">
                    <PlayCircleIcon className="h-5 w-5" />
                </Button>
            </Link>

            <Link href={`/encounter/${encounter.id}`}>
                <Button color="green" className="cursor-pointer">
                    <PencilSquareIcon className="h-5 w-5" />
                </Button>
            </Link>

            <Button
                color="red"
                onClick={() => handleDelete(encounter.id)}
                className="cursor-pointer"
            >
                <XCircleIcon className="h-5 w-5" />
            </Button>

        </div>
    </div>
);
}
