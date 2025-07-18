import Link from 'next/link';
import { Button } from 'flowbite-react';
import { PencilSquareIcon, XCircleIcon, PlayCircleIcon } from '@heroicons/react/16/solid';

export default function EncounterItem({ encounter, handleDelete }) {
    return (
        <div className="flex flex-col gap-2 rounded-lg bg-gray-100 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <div className="text-center text-lg font-bold select-none sm:text-left sm:text-xl">
                {encounter.name}
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
                <Link href={`/fight/${encounter.id}`}>
                    <Button className="cursor-pointer" size="sm">
                        <PlayCircleIcon className="h-5 w-5" />
                    </Button>
                </Link>

                <Link href={`/encounter/${encounter.id}`}>
                    <Button color="green" className="cursor-pointer" size="sm">
                        <PencilSquareIcon className="h-5 w-5" />
                    </Button>
                </Link>

                <Button
                    color="red"
                    onClick={() => handleDelete(encounter.id)}
                    className="cursor-pointer"
                    size="sm"
                >
                    <XCircleIcon className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
