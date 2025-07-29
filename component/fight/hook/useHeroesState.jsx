import { useState } from 'react';

export function useHeroesState() {
    const [heroSettings, setHeroSettings] = useState({
        nbHeroes: 1,
        levelHeroes: 1,
    });

    const updateHeroSettings = (field, value) => {
        setHeroSettings(prev => ({ ...prev, [field]: value }));
    };

    return {
        heroSettings,
        updateHeroSettings
    };
}