export default function ActionButton({ handleClick, action}) {
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer px-2 py-1 bg-transparent rounded-md transition-transform duration-200 hover:scale-105 text-left"
      aria-label={`Lancer ${action.name}`}
    >
      <span className="font-bold text-lg">{action.name}</span>
      <span className="ml-1">{action.description}</span>
    </button>
  );
}