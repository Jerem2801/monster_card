export default function DamageButton({ handleClick, name, description, dice }) {
  return (
    <button
      onClick={handleClick}
      className="cursor-pointer px-2 py-1 bg-transparent rounded-md transition-transform duration-200 hover:scale-105"
      aria-label={`Lancer ${name}`}
    >
      <span className="font-bold text-lg">{name}</span>
      <span className="ml-1">{description}</span>
    </button>
  );
}