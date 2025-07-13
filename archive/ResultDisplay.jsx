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
                <span key={i} className="rounded px-1 font-bold text-green-400">
                    {dice}
                </span>
            );
        }
        if (i === 0 && isFailed) {
            return (
                <span key={i} className="rounded px-1 font-bold text-red-400">
                    {dice}
                </span>
            );
        }
        // Dés explosés = ceux lancés en plus (i >= numberDice)
        if (i >= (resultToDisplay.diceProperty?.numberDice || 0)) {
            return (
                <span key={i} className="rounded px-1 font-semibold text-blue-400">
                    {dice}
                </span>
            );
        }
        // Dés normaux
        return (
            <span key={i} className="rounded px-1">
                {dice}
            </span>
        );
    });

    return (
        <div
            className="mt-2 inline-block cursor-pointer rounded border border-gray-300 bg-gray-100 p-2"
            onClick={onHide}
            title="Cliquer pour masquer le résultat"
        >
            {/* Conteneur tooltip */}
            <Tooltip content={content} placement="top" style="light">
                <div className="group relative inline-block font-semibold">
                    Résultat total : <span className={resultClasses}>{resultToDisplay.total}</span>
                    {isCritic && (
                        <span
                            role="img"
                            aria-label="critique"
                            className="ml-1 text-xl text-green-600"
                        >
                            💥
                        </span>
                    )}
                    {isFailed && (
                        <span
                            role="img"
                            aria-label="critique"
                            className="ml-1 text-xl text-red-600"
                        >
                            💀
                        </span>
                    )}
                </div>
            </Tooltip>
        </div>
    );
}
