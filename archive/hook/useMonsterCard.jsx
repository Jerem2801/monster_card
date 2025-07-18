import { useState, useEffect } from 'react';

export function useMonsterCard(monster) {
    // Synchronise localMonster si la prop monster change
    const [localMonster, setLocalMonster] = useState(monster);
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    useEffect(() => {
        setLocalMonster(monster);
    }, [monster]);

    // Sécurité : vérifie que monster est défini
    useEffect(() => {
        if (!monster) {
            setLocalMonster(null);
            setSelectedStatuses([]);
            setDead(false);
        }
    }, [monster]);

    return {
        localMonster,
        setLocalMonster,
        selectedStatuses,
        setSelectedStatuses,
    };
}
// ...existing code...
