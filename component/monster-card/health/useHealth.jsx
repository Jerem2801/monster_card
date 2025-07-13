// useHeal.ts
import { useState } from 'react';

export function useHealth(hpMax, sendNewHp) {
    const [currentHp, setCurrentHp] = useState(hpMax);

    const updateHealth = delta => {
        const newHp = Math.max(0, Math.min(hpMax, currentHp + delta));
        setCurrentHp(newHp);
        sendNewHp(newHp);
    };

    function getHealthGradient(currentHp, hpMax) {
        const ratio = Math.max(0, Math.min(1, currentHp / hpMax));
        const color = ratio <= 0.2 ? '#f87171' : ratio <= 0.5 ? '#fbbf24' : '#4ade80';

        const percent = ratio * 100;

        return `linear-gradient(to right, ${color} ${percent}%, #ffffff ${percent}%)`;
    }

    return {
        currentHp,
        updateHealth,
        getHealthGradient,
    };
}
