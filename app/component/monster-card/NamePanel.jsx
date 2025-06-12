export default function NamePanel({ monster }) {
    return (
        	<div className="flex items-baseline gap-2 flex-wrap">
				<div className="italic font-semibold text-xl flex flex-wrap">
					{monster.name.split(" ").map((word, index) => (
						<span key={index} className="mr-1 leading-none">
							<span className="text-2xl">{word.charAt(0)}</span>
							<span className="text-lg uppercase">{word.slice(1)}</span>
						</span>
					))}
				</div>

				<span className="text-gray-500 text-sm">Niv. {monster.level}</span>

				{monster.armor !== undefined && (
					<span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">
						🛡️ {monster.armor}
					</span>
				)}

				{monster.speed !== undefined && (
					<span className="ml-2 px-2 py-0.5 bg-green-100 text-yellow-700 rounded text-xs font-bold">
						🏃 {monster.speed}
					</span>
				)}

				{monster.fly !== undefined && (
                    <span className="ml-2 px-2 py-0.5 bg-green-100 text-yellow-700 rounded text-xs font-bold">
                        🪽 {monster.fly}
                    </span>
                )}
			</div>
    );
}