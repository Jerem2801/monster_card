"use client";

import { useState } from "react";

export default function HealButton({ hpMax, isBloodied }) {

	const [currentHp, setCurrentHp] = useState(hpMax);

	function addHeal() {
		let newHp = currentHp + 1;
		if (newHp > hpMax) {
			newHp = currentHp;
		}
        if(newHp >= hpMax/2){
            isBloodied(false);
        }
		return setCurrentHp(newHp);
	}

	function removeHeal() {
		let newHp = currentHp - 1;
		if (newHp < 0) {
			newHp = currentHp;
		}
        if(newHp <= hpMax/2){
            isBloodied(true);
        }

		return setCurrentHp(newHp);
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
                onClick={removeHeal}
                aria-label="Decrease health"
                className="flex h-8 w-8 items-center justify-center p-0 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition cursor-pointer"
            >
                −
            </button>

            <span className="flex h-8 w-20 items-center justify-center font-mono text-lg font-medium text-gray-700 leading-none">
                {currentHp} / {hpMax}
            </span>

            <button
                onClick={addHeal}
                aria-label="Increase health"
                className="flex h-8 w-8 items-center justify-center p-0 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition cursor-pointer"
            >
                +
            </button>
        </div>

    );
}