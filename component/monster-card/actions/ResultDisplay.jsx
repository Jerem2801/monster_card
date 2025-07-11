import { Button, Tooltip } from 'flowbite-react';

export default function ResultDisplay({ resultToDisplay, onHide }) {
    if (!resultToDisplay || resultToDisplay.dices.length === 0) return null;

    const isFailed = resultToDisplay.type === 'failed';
    const isCritic = resultToDisplay.type === 'critic';

    const resultClasses = [
        'mt-2 font-bold text-xl transition-transform duration-300',
        isFailed ? 'text-red-600' : '',
        !isFailed && isCritic ? 'text-green-600 scale-110' : '',
    ].join(' ');

    const content = resultToDisplay.dices.map((dice, i) => {
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
    });

    return (
        <div
            className="inline-block mt-2 p-2 bg-gray-100 border border-gray-300 rounded cursor-pointer"
            onClick={onHide}
            title="Cliquer pour masquer le résultat"
        >
            {/* Conteneur tooltip */}
            <Tooltip content={content} placement="top" style="light">
                <div className="relative group inline-block font-semibold">
                    Résultat total : <span className={resultClasses}>{resultToDisplay.total}</span>
                    {isCritic && (
                        <span
                            role="img"
                            aria-label="critique"
                            className="text-green-600 text-xl ml-1"
                        >
                            💥
                        </span>
                    )}
                    {isFailed && (
                        <span
                            role="img"
                            aria-label="critique"
                            className="text-red-600 text-xl ml-1"
                        >
                            💀
                        </span>
                    )}
                </div>
            </Tooltip>
        </div>
    );
}
