export default function ActionButton({ handleClick, action }) {
  const formatDice = ({ numberDice, valueDice, bonus }) => {
    let result = `${numberDice}d${valueDice}`;
    if (bonus && bonus !== 0) {
      result += bonus > 0 ? `+${bonus}` : `${bonus}`;
    }
    return result;
  };

  // Vérifie si $dice est dans la description
  const hasDice = action.description.includes("$dice");
  const diceText = hasDice ? formatDice(action.dice) : null;

  let content;

  if (hasDice) {
    const [before, after] = action.description.split("$dice");
    content = (
      <>
        <span>{before}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="inline-block bg-gray-200 hover:bg-gray-300 rounded px-1 cursor-pointer text-md align-middle"
          aria-label={`Lancer ${diceText}`}
          type="button"
        >
          {diceText} 🎲
        </button>
        <span>{after}</span>
      </>
    );
  } else {
    // Pas de $dice, on affiche la description brute
    content = <span>{action.description}</span>;
  }

  return (
    <div
      className="px-2 py-1 rounded-md text-left"
      aria-label={`Lancer ${action.name}`}
    >
      <span className="font-bold text-lg">{action.name}</span>{" "}
      <span className="ml-1 text-base">{content}</span>
    </div>
  );
}
