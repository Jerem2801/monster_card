"use client";

import { useState } from "react";

export default function HealButton({ hpMax, sendNewHp}) {

	const [currentHp, setCurrentHp] = useState(hpMax);


    function updateHeal(addValue){
        if ((addValue > 0 && currentHp === hpMax) || (addValue < 0 && currentHp === 0)) {
			return;
		}
        let newHp = currentHp + addValue;
        setCurrentHp(newHp);
        sendNewHp(newHp);
    }

    return (
        <div
            className="flex items-center justify-center gap-3 relative overflow-hidden border border-gray-300 rounded-md px-3 py-1.5 shadow-sm"
                            style={{
                    background: `linear-gradient(to right, ${
                        currentHp / hpMax <= 0.2
                            ? '#f87171' // rouge
                            : currentHp / hpMax <= 0.5
                            ? '#fbbf24' // orange
                            : '#4ade80' // vert
                    } ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%, #ffffff ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%)`,
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.75rem',
                    transition: 'background 0.3s',
                }}
        >
            <button
                onClick={() => updateHeal(-1)}
                aria-label="Decrease health"
                className="flex h-8 w-8 items-center justify-center p-0 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition cursor-pointer"
            >
                −
            </button>

            <span className="inline-flex h-8 items-center font-mono text-lg font-medium text-gray-700 leading-none">
                {currentHp} / {hpMax}
            </span>

            <button
                onClick={() => updateHeal(+1)}
                aria-label="Increase health"
                className="flex h-8 w-8 items-center justify-center p-0 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition cursor-pointer"
            >
                +
            </button>
        </div>

    );
}