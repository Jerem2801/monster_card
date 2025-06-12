export default function DamageButton({handleClick,name, description, dice}) {
  return (
    <button
      onClick={() => handleClick(dice)}
      className="cursor-pointer px-4 py-2 bg-transparent rounded-md transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      <span className="font-bold text-lg">{name}</span>
      <span className="ml-1">{description}</span>
    </button>
  );
}