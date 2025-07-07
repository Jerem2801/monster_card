"use client";

import { useState } from "react";

export default function HealButtonLegendary({ hpMax}) {

	const [currentHp, setCurrentHp] = useState(hpMax);

	function addHeal() {
		let newHp = currentHp + 1;
		if (newHp > hpMax) {
			newHp = currentHp;
		}
		return setCurrentHp(newHp);
	}

	function removeHeal() {
		let newHp = currentHp - 1;
		if (newHp < 0) {
			newHp = currentHp;
		}
		return setCurrentHp(newHp);
	}

    return (
        <div
            className="flex items-center justify-center gap-3 relative overflow-hidden border border-gray-300 rounded-md px-3 py-1.5 shadow-sm"
            style={{
                background: `linear-gradient(to right, #3b82f6 ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%, #ffffff ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%)`,
                borderRadius: '0.375rem',
                padding: '0.25rem 0.75rem',
                transition: 'background 0.3s',
            }}
        >
            <button
                onClick={() => removeHeal()}
                aria-label="Decrease health"
                className="flex h-8 w-8 items-center justify-center p-0 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold transition cursor-pointer"
            >
                −
            </button>

            <span className="flex h-8 w-20 items-center justify-center font-mono text-lg font-medium text-gray-700 leading-none">
                {currentHp} / {hpMax}
            </span>

            <button
                onClick={() => addHeal()}
                aria-label="Increase health"
                className="flex h-8 w-8 items-center justify-center p-0 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold transition cursor-pointer"
            >
                +
            </button>
        </div>

    );
}