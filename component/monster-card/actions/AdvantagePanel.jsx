export default function AdvantagePanel({
    advantage,
    setAdvantage,
    onThrowDice,
    closeWindows,
    diceProperty,
}) {
    function getMinTotal({ numberDice, valueDice, bonus }) {
        return 1 + numberDice + bonus;
    }

    function getMaxTotal({ numberDice, valueDice, bonus }) {
        return numberDice * valueDice + bonus;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
            <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                {/* Bouton fermer */}
                <button
                    onClick={closeWindows}
                    aria-label="Fermer la fenêtre"
                    className="absolute top-3 right-3 text-2xl text-gray-400 transition-colors hover:text-red-500"
                >
                    &times;
                </button>

                {/* Titre */}
                <h2 className="text-xl font-semibold text-gray-800">Ajuster l’avantage</h2>

                <div className="w-full rounded-lg bg-gray-100 p-4 text-sm text-gray-700">
                    <p>
                        <strong>Fourchette :</strong>
                        <span className="mr-1 ml-1 text-red-500">{getMinTotal(diceProperty)}</span>-
                        <span className="ml-1.5 text-green-500">{getMaxTotal(diceProperty)}</span>
                    </p>
                </div>

                {/* Contrôle d’avantage */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={() => setAdvantage(a => a - 1)}
                        aria-label="Réduire avantage"
                        className="h-10 w-10 rounded-full bg-red-100 text-xl font-bold text-red-600 shadow transition hover:bg-red-200"
                    >
                        −
                    </button>

                    <span className="w-10 text-center text-3xl font-bold text-gray-700">
                        {advantage}
                    </span>

                    <button
                        onClick={() => setAdvantage(a => a + 1)}
                        aria-label="Augmenter avantage"
                        className="h-10 w-10 rounded-full bg-green-100 text-xl font-bold text-green-600 shadow transition hover:bg-green-200"
                    >
                        +
                    </button>
                </div>

                {/* Bouton lancer */}
                <button
                    onClick={onThrowDice}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
                >
                    Lancer le dé 🎲
                </button>
            </div>
        </div>
    );
}
