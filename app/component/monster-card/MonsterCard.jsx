"use client";

import AttacksButtons from "./actions/AttacksButtons";
import StatusSelector from "./status/StatusSelector";
import HealButton from "./HealButton";
import NamePanel from "./NamePanel";
import PassivePanel from "./PassivePanel";
import EnemyStatusSelector from "./status/EnemyStatusSelector";
import {useState} from "react";

export default function MonsterCard({ monster, remove }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedStatuses, setSelectedStatuses] = useState([]);

	const openStatusModal = () => {
		setShowModal(true);
	};

	const closeStatusModal = () => {
		setShowModal(false);
	};

	function toggleStatus(id){
		setSelectedStatuses((prev) =>
		prev.includes(id)
			? prev.filter((s) => s !== id)
			: [...prev, id]
		);
	};

	function isBloodied(bloodied){
		if(bloodied && !selectedStatuses.includes("bloodied")){
			setSelectedStatuses((prev) => [...prev, "bloodied"]);
		}else if(!bloodied){
			setSelectedStatuses((prev) => prev.filter((s) => s !== "bloodied"));
		}	
	}

	return (
		<div className="w-full max-w-lg p-4 space-y-3 border border-neutral-200 rounded-md bg-amber-50 shadow-md">

			{/*<button
			  	onClick={remove}
			  	className="float-right cursor-pointer text-3xl font-bold text-red-600 hover:text-red-800 transition-colors"
			  	aria-label="Remove Monster"
			>
				x
			</button>*/}

			<NamePanel monster={monster} openStatusModal={openStatusModal}/>

			<HealButton hpMax={monster.hp} isBloodied={isBloodied}/>

			<PassivePanel monster={monster} />

			<AttacksButtons monster={monster} />

			{showModal && (<StatusSelector handleStatusModal={closeStatusModal} selectedStatuses={selectedStatuses} toggleStatus={toggleStatus}/>) }
			
			<EnemyStatusSelector selectedStatuses={selectedStatuses}/>

		</div>
	);
}
