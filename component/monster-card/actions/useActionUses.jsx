import { useState } from 'react';

export function useActionUses(action) {
    const useCount = action.use ?? 0;
    const [checkedStates, setCheckedStates] = useState(Array(useCount).fill(false));

    const allChecked = useCount > 0 && checkedStates.every(val => val);

    const toggleCheckbox = index => {
        setCheckedStates(prev => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return {
        useCount,
        checkedStates,
        allChecked,
        toggleCheckbox,
    };
}
