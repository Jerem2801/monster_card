import { PlusIcon, MinusIcon } from '@heroicons/react/16/solid';

export default function StatPanel({selected,monster,add,remove}){
    return (
        <div>
            {!selected && (
                <div className="flex flex-shrink-0 items-center gap-1 pt-3">
                    <span className="rounded bg-red-300 px-2 py-0.5 text-sm font-bold text-red-600" title="Points de vie">
                        ❤️ {monster.hp}
                    </span>

                    {monster.armor && monster.armor.toLowerCase() !== 'none' && (
                        <span className="rounded bg-slate-300 px-2 py-0.5 text-sm font-bold text-slate-600" title="Armure">
                            🛡️ {monster.armor}
                        </span>
                    )}

                    {monster.save !== undefined && monster.save !== '' && (
                        <span className="rounded bg-amber-200 px-2 py-0.5 text-sm font-bold text-amber-600" title="Sauvegarde">
                            ⭐ {monster.save}
                        </span>
                    )}

                    <button
                        className="cursor-pointer rounded bg-green-200 px-2 py-0.5 text-sm font-bold text-green-700 transition hover:bg-green-300 active:scale-90"
                        onClick={add}
                        title="Ajouter le monstre"
                    >
                        <PlusIcon className="h-5 w-5" />
                    </button>
                </div>
            )}

            {selected && (
                <div className="flex flex-shrink-0 items-center gap-1 pt-3">
                    <button
                        className="cursor-pointer rounded bg-red-200 px-2 py-0.5 text-sm font-bold text-red-700 transition hover:bg-red-300 active:scale-90"
                        onClick={remove}
                        title="Retirer le monstre"
                    >
                        <MinusIcon className="h-5 w-5" />
                    </button>
                </div>
            )}
        </div>
    );
}