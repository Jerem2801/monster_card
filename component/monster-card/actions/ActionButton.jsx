import { useState } from 'react';

export default function ActionButton({ handleClick, action }) {
    const useCount = action.use ?? 0; // 0 si undefined/null
    const [checkedStates, setCheckedStates] = useState(Array(useCount).fill(false));

    const allChecked = useCount > 0 && checkedStates.every(val => val === true);

    const toggleCheckbox = index => {
        const newStates = [...checkedStates];
        newStates[index] = !newStates[index];
        setCheckedStates(newStates);
    };

    const formatDice = ({ numberDice, valueDice, bonus }) => {
        let result = `${numberDice}d${valueDice}`;
        if (bonus && bonus !== 0) {
            result += bonus > 0 ? `+${bonus}` : `${bonus}`;
        }
        return result;
    };

    const hasDice = action.description.includes('$dice');
    const diceText = hasDice ? formatDice(action.dice) : null;

    let content;

    if (hasDice) {
        const [before, after] = action.description.split('$dice');
        content = (
            <>
                <span>{before}</span>
                <button
                    onClick={e => {
                        e.stopPropagation();
                        handleClick();
                    }}
                    className="text-md inline-block cursor-pointer rounded bg-gray-200 px-1 align-middle hover:bg-gray-300"
                    aria-label={`Lancer ${diceText}`}
                    type="button"
                >
                    {diceText} 🎲
                </button>
                <span>{after}</span>
            </>
        );
    } else {
        content = <span>{action.description}</span>;
    }

    return (
        <div
            className={`rounded-md px-2 py-1 text-left ${
                allChecked ? 'text-gray-500 line-through' : ''
            }`}
            aria-label={`Lancer ${action.name}`}
        >
            <span className="text-lg font-bold">{action.name}</span>{' '}
            {useCount > 0 && (
                <span className="ml-2 text-sm text-gray-700">
                    (
                    {checkedStates.map((checked, i) => (
                        <input
                            key={i}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheckbox(i)}
                            className="mx-0.5"
                        />
                    ))}
                    Utilisation)
                </span>
            )}
            <span className="ml-1 text-base">{content}</span>
        </div>
    );
}
