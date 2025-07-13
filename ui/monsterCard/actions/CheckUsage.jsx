export default function CheckUsage({ useCount, checkedStates, toggleCheckbox }) {
    return (
        <>
            {useCount > 0 && (
                <span className="ml-1 text-sm text-gray-700">
                    {checkedStates.map((checked, i) => (
                        <input
                            key={i}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheckbox(i)}
                            className="mx-0.5"
                        />
                    ))}
                </span>
            )}
        </>
    );
}
