import Link from 'next/link';
import { Button } from 'flowbite-react';
import { PencilSquareIcon, XCircleIcon, PlayCircleIcon } from '@heroicons/react/16/solid';

export default function EncounterItemPanel({ encounterId, handleDelete }) {
    return (
        <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            <Link href={`/fight/${encounterId}`}>
                <Button className="cursor-pointer" size="sm">
                    <PlayCircleIcon className="h-5 w-5" />
                </Button>
            </Link>

            <Link href={`/encounter/${encounterId}`}>
                <Button color="green" className="cursor-pointer" size="sm">
                    <PencilSquareIcon className="h-5 w-5" />
                </Button>
            </Link>

            <Button
                color="red"
                onClick={() => handleDelete(encounterId)}
                className="cursor-pointer"
                size="sm"
            >
                <XCircleIcon className="h-5 w-5" />
            </Button>
        </div>
    );
}
