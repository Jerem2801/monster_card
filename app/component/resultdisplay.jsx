export default function ResultDisplay({ resultToDisplay, isCritic, isFailed }) {
  if (!resultToDisplay || resultToDisplay.dices.length === 0) return null;

  const resultClasses = [
    "mt-2 font-bold text-xl transition-transform duration-300",
    isFailed ? "text-red-600" : "",
    !isFailed && isCritic ? "text-green-600 scale-110" : ""
  ].join(" ");

  return (
    <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded w-full max-w-sm">
      {/* Conteneur tooltip */}
      <div className="relative group cursor-pointer inline-block font-semibold">
        Résultat total :{" "}
        <span className={resultClasses}>{resultToDisplay.total}</span>

        {/* Tooltip, caché par défaut, visible au hover */}
        <div className="absolute left-1/2 -translate-x-1/2 mt-1 bottom-full mb-2 hidden group-hover:flex whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white z-10 select-none space-x-1">
			Dés lancés :{" "}
			{resultToDisplay.dices.map((dice, i) => (
				<span
				key={i}
				className={`px-1 rounded ${
					dice === 6 ? "text-green-400 font-bold" : ""
				}`}
				>
				{dice}
				</span>
			))}
			</div>
      </div>
    </div>
  );
}
