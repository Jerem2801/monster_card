export default function NamePanel({ monster,add,remove, selected }) {
    return (
        <div className="flex items-start flex-nowrap w-full gap-4">
            
            {/* Bloc gauche : nom et niveau, qui s'adapte */}
            <div className="flex flex-col justify-between flex-1 min-w-0">
                <span className="text-lg font-semibold truncate">{monster.name}</span>
                <span className="text-gray-500 text-sm truncate">Niv. {monster.level}</span>
            </div>
			{!selected && (
            <div className="flex items-center gap-1 flex-shrink-0 pt-3">
                <span className="px-2 py-0.5 bg-red-300 text-red-600 rounded text-sm font-bold">
                    ❤️ {monster.hp}
                </span>

                {monster.armor && monster.armor.toLowerCase() !== "none" && (
                    <span className="px-2 py-0.5 bg-slate-300 text-slate-600 rounded text-sm font-bold">
                        🛡️ {monster.armor}
                    </span>
                )}

                {monster.save !== undefined && monster.save !== "" && (
                    <span className="px-2 py-0.5 bg-amber-200 text-amber-600 rounded text-sm font-bold">
                        ⭐ {monster.save}
                    </span>
                )}

				<button className="px-2 py-0.5 bg-green-200 rounded text-sm font-bold hover:bg-green-300 cursor-pointer transition-colors" onClick={add}>
                        ➕
                </button>
				
            </div>
			)}

			{selected && (
			<div className="flex items-center gap-1 flex-shrink-0 pt-3">
				<button className="px-2 py-0.5 bg-red-200 rounded text-sm font-bold hover:bg-red-300 cursor-pointer transition-colors" onClick={remove}>
					➖	
				</button>
            </div>)}
		</div>
    );
}
