export default function NamePanel({ monster, openStatusModal }) {
    return (
        <div className="flex flex-wrap items-baseline gap-2">
            <div className="flex flex-wrap font-semibold">
                <button className="cursor-pointer" onClick={openStatusModal}>
                    {monster.name.split(' ').map((word, index) => (
                        <span key={index} className="mr-1">
                            <span className="text-2xl">{word.charAt(0)}</span>
                            <span className="text-lg uppercase">{word.slice(1)}</span>
                        </span>
                    ))}
                </button>
            </div>

            <span className="text-sm text-gray-500">Niv. {monster.level}</span>

            {monster.armor && monster.armor.toLowerCase() !== 'none' && (
                <span className="ml-2 rounded bg-slate-300 px-2 py-0.5 text-sm font-bold text-slate-600">
                    🛡️ {monster.armor}
                </span>
            )}

            {monster.speed !== undefined && monster.speed !== '' && (
                <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-sm font-bold text-blue-400">
                    🏃 {monster.speed}
                </span>
            )}

            {monster.save !== undefined && monster.save !== '' && (
                <span className="ml-2 rounded bg-amber-200 px-2 py-0.5 text-sm font-bold text-amber-600">
                    ⭐ {monster.save}
                </span>
            )}
        </div>
    );
}
