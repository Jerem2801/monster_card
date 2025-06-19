export default function AdvantagePanel({ advantage, setAdvantage, onThrowDice }) {
  return (
    <div className="absolute left-full top-0 ml-2 flex items-center gap-2 z-10 text-sm select-none bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm w-max">
      <button
        onClick={() => setAdvantage((a) => a - 1)}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        aria-label="Réduire avantage"
      >
        −
      </button>

      <span className="font-bold w-6 text-center">{advantage}</span>

      <button
        onClick={() => setAdvantage((a) => a + 1)}
        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        aria-label="Augmenter avantage"
      >
        +
      </button>

      <button
        onClick={onThrowDice}
        className="text-lg cursor-pointer transition-transform duration-200 hover:scale-110"
        aria-label="Lancer le dé"
      >
        OK
      </button>
    </div>
  );
}
