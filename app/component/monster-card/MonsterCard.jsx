"use client";

import AttackButton from "../attackbutton";
import HealButton from "./HealButton";
import NamePanel from "./NamePanel";
import PassivePanel from "./PassivePanel";

export default function MonsterCard({ monster, remove }) {

	return (
		<div className="rounded-lg bg-amber-50 p-4 shadow-md w-full max-w-md space-y-3 border border-neutral-700">

			<button
				onClick={remove}
				className="cursor-pointer float-right text-red-600 hover:text-red-800 font-bold text-3xl focus:outline-none"
				aria-label="Remove Monster"
			>
				×
			</button>	

			<NamePanel monster={monster} />

			<PassivePanel monster={monster} />

			{monster.action.map((action) => (
				<AttackButton key={action.name} action={action} />
			))}

			<HealButton hpMax={monster.hp} />
		</div>
	);
}
