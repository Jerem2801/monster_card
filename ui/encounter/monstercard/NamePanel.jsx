import { PlusIcon, MinusIcon } from '@heroicons/react/16/solid';

export default function NamePanel({ monster, add, remove, selected }) {
    return (
        <div className="flex w-full flex-nowrap items-start gap-4">
            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <span className="truncate text-lg font-semibold">{monster.name}</span>
                <span className="truncate text-sm text-gray-500">Niv. {monster.level}</span>
            </div>
            {!selected && (
                <div className="flex flex-shrink-0 items-center gap-1 pt-3">
                    <span className="rounded bg-red-300 px-2 py-0.5 text-sm font-bold text-red-600">
                        ❤️ {monster.hp}
                    </span>

                    {monster.armor && monster.armor.toLowerCase() !== 'none' && (
                        <span className="rounded bg-slate-300 px-2 py-0.5 text-sm font-bold text-slate-600">
                            🛡️ {monster.armor}
                        </span>
                    )}

                    {monster.save !== undefined && monster.save !== '' && (
                        <span className="rounded bg-amber-200 px-2 py-0.5 text-sm font-bold text-amber-600">
                            ⭐ {monster.save}
                        </span>
                    )}

                    <button
                        className="cursor-pointer rounded bg-green-200 px-2 py-0.5 text-sm font-bold text-green-700 transition-colors hover:bg-green-300"
                        onClick={add}
                    >
                        <PlusIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            {selected && (
                <div className="flex flex-shrink-0 items-center gap-1 pt-3">
                    <button
                        className="cursor-pointer rounded bg-red-200 px-2 py-0.5 text-sm font-bold text-red-700 transition-colors hover:bg-red-300"
                        onClick={remove}
                    >
                        <MinusIcon className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}
