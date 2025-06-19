"use client";

import AttackButton from "./actions/AttackButton";
import HealButton from "./HealButton";
import NamePanel from "./NamePanel";
import PassivePanel from "./PassivePanel";
import EnemyStatusSelector from "./actions/EnemyStatusSelector";

export default function MonsterCard({ monster, remove }) {

	return (
		<div className="w-full max-w-lg p-4 space-y-3 border border-neutral-200 rounded-md bg-amber-50 shadow-md">

			{/*<button
			  	onClick={remove}
			  	className="float-right cursor-pointer text-3xl font-bold text-red-600 hover:text-red-800 transition-colors"
			  	aria-label="Remove Monster"
			>
				x
			</button>*/}

			<NamePanel monster={monster} />

			<HealButton hpMax={monster.hp} />

			<PassivePanel monster={monster} />

			{monster.action.map((action) => (
				<AttackButton key={action.name} action={action} />
			))}
			
			{/*<EnemyStatusSelector />*/}

		</div>
	);
}
