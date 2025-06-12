"use client";

import { useState } from "react";

export default function HealButton({ hpMax }) {

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
        <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-md px-3 py-1 shadow-sm w-max">

            <button
                className="cursor-pointer px-2 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition"
                onClick={removeHeal}
                aria-label="Decrease health"
            >
                −
            </button>

            <span className="font-mono text-lg font-medium text-gray-700">
                {currentHp} / {hpMax}
            </span>

            <button
                className="cursor-pointer px-2 py-0.5 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition"
                onClick={addHeal}
                aria-label="Increase health"
            >
                +
            </button>
			
        </div>
    );
}