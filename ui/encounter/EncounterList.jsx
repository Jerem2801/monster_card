import { PencilSquareIcon, XCircleIcon, PlayCircleIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { Button } from 'flowbite-react';

export default function EncounterList({ encounters, handleDelete }) {
    return (
        <div className="flex flex-col gap-4">
            {encounters.length === 0 ? (
                <p className="text-gray-500">Aucune rencontre trouvée.</p>
            ) : (
                encounters.map(encounter => (
                    <div
                        className="flex items-center justify-between rounded-lg bg-gray-100 p-2 shadow-sm transition-colors hover:bg-gray-200"
                        key={encounter.id}
                    >
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

                            <Button color="red" className="cursor-pointer" onClick={() => handleDelete(encounter.id)}>
                                <XCircleIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
