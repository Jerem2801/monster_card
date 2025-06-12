export default function ResultDisplay({ resultToDisplay, onHide }) {

    if (!resultToDisplay || resultToDisplay.dices.length === 0) return null;

	const isFailed = resultToDisplay.type === 'failed';
	const isCritic = resultToDisplay.type === 'critic';

    const resultClasses = [
        "mt-2 font-bold text-xl transition-transform duration-300",
        isFailed ? "text-red-600" : "",
        !isFailed && isCritic ? "text-green-600 scale-110" : "",
    ].join(" ");

    return (
        <div className="mt-3 p-2 bg-gray-100 border border-gray-300 rounded w-full max-w-sm" onClick={onHide} style={{cursor: 'pointer'}} title="Cliquer pour masquer le résultat">
            {/* Conteneur tooltip */}
            <div className="relative group inline-block font-semibold">
                Résultat total :{" "}
                <span className={resultClasses}>{resultToDisplay.total}</span>
                {isCritic && (
                    <span role="img" aria-label="critique" className="text-green-600 text-xl">
                        💥
                    </span>
                )}

                {/* Tooltip, caché par défaut, visible au hover */}
                <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 hidden group-hover:flex whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white z-10 select-none space-x-1">
                    Dés lancés :{" "}
                    {resultToDisplay.dices.map((dice, i) => {
                        // Critique = premier dé (i === 0) et valeur max
                        if (i === 0 && isCritic) {
                            return (
                                <span key={i} className="px-1 rounded text-green-400 font-bold">
                                    {dice}
                                </span>
                            );
                        }
                        if (i === 0 && isFailed) {
                            return (
                                <span key={i} className="px-1 rounded text-red-400 font-bold">
                                    {dice}
                                </span>
                            );
                        }
                        // Dés explosés = ceux lancés en plus (i >= numberDice)
                        if (i >= (resultToDisplay.diceProperty?.numberDice || 0)) {
                            return (
                                <span key={i} className="px-1 rounded text-blue-400 font-semibold">
                                    {dice}
                                </span>
                            );
                        }
                        // Dés normaux
                        return (
                            <span key={i} className="px-1 rounded">
                                {dice}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
