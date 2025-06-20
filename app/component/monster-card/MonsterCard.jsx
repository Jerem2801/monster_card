"use client";

import AttacksButtons from "./actions/AttacksButtons";
import StatusSelector from "./status/StatusSelector";
import LegendaryMecanics from "./legendary/LegendaryMechanics";
import HealButton from "./HealButton";
import NamePanel from "./NamePanel";
import PassivePanel from "./PassivePanel";
import ListStatus from "./status/ListStatus";
import {useState} from "react";

export default function MonsterCard({ monster, remove }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedStatuses, setSelectedStatuses] = useState([]);
	const [bloodied2, setBloodied2] = useState(false);

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
			setBloodied2(true);
		}else if(!bloodied){
			setSelectedStatuses((prev) => prev.filter((s) => s !== "bloodied"));
			setBloodied2(false);
		}
	}
	
	if(monster.name==="Krogg, Roi des Gobelins" && bloodied2){
		const updatedMonster = structuredClone(monster);
		updatedMonster.action.map((newAction) => {
			if (newAction.dice !== undefined) {
				newAction.dice.valueDice = 8;
			}
		});
		monster = updatedMonster;
	}

	if(monster.name==="Krogg, Roi des Gobelins" && bloodied2){
		const updatedMonster = structuredClone(monster);
		updatedMonster.armor = "L";
		monster = updatedMonster;
	}


	return (
		<div className="w-full max-w-xl p-4 space-y-3 border border-neutral-200 rounded-md bg-amber-50 shadow-md">
			{showModal && (<StatusSelector handleStatusModal={closeStatusModal} selectedStatuses={selectedStatuses} toggleStatus={toggleStatus}/>) }
			{/*<button
			  	onClick={remove}
			  	className="float-right cursor-pointer text-3xl font-bold text-red-600 hover:text-red-800 transition-colors"
			  	aria-label="Remove Monster"
			>
				x
			</button>*/}

			<NamePanel monster={monster} openStatusModal={openStatusModal}/>
				
			<HealButton hpMax={monster.hp} isBloodied={isBloodied}/>

			<PassivePanel monster={monster}/>

			<AttacksButtons monster={monster} />
			
			{monster.bloodied !== undefined && (
				<LegendaryMecanics monster={monster} />
			)}

			<ListStatus selectedStatuses={selectedStatuses} removeStatus={toggleStatus} />

		</div>
	);
}
