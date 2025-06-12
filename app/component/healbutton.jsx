export default function HealButton({remove, add, heal,healMax}) {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm w-max">
  <button
    className="cursor-pointer px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition"
    onClick={remove}
    aria-label="Decrease health"
  >
    −
  </button>
  <span className="font-mono text-lg font-medium text-gray-700">
    {heal} / {healMax}
  </span>
  <button
    className="cursor-pointer px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition"
    onClick={add}
    aria-label="Increase health"
  >
    +
  </button>
      <span className="text-2xl">❤️</span>
</div>


    );
}