"use client";

import RemoveMonsterCardButton from "./RemoveMonsterCardButton";
import AttacksButtons from "./actions/AttacksButtons";
import StatusSelector from "./status/StatusSelector";
import LegendaryMecanics,{updateLegendaryMonster2} from "./legendary/LegendaryMechanics";
import HealButtonLegendary from "./legendary/HealButtonLegendary";
import HealButton from "./HealButton";
import NamePanel from "./NamePanel";
import PassivePanel from "./PassivePanel";
import ListStatus from "./status/ListStatus";
import {useState} from "react";

export default function MonsterCard({ monster, removeMonsterCard }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedStatuses, setSelectedStatuses] = useState([]);
	const [localMonster,setLocalMonster] = useState(monster);

	const [dead, setDead] = useState(false);

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

	function updateLegendaryMonster(newHp){
		if(monster.legendary){
			let updatedMonster = structuredClone(localMonster);
			updateLegendaryMonster2(updatedMonster,newHp);
			if(newHp === 0){
				setDead(true);	
			}else{
				setDead(false);	
			}
			setLocalMonster(updatedMonster);
		}
	}



	return (
		<div className="w-[30%] p-4 space-y-3 border border-neutral-200 rounded-md bg-amber-50 shadow-md">

			{showModal && (<StatusSelector handleStatusModal={closeStatusModal} selectedStatuses={selectedStatuses} toggleStatus={toggleStatus}/>) }
			
			{/*<RemoveMonsterCardButton removeMonsterCard={removeMonsterCard} />*/}

			<NamePanel monster={localMonster} openStatusModal={openStatusModal}/>

				
			<HealButton hpMax={localMonster.hp} isBloodied={isBloodied} updateLegendaryMonster={updateLegendaryMonster}/>

			{dead && (
				<HealButtonLegendary hpMax={localMonster.lastStand.hp} />
			)}

			<PassivePanel monster={localMonster}/>

			<AttacksButtons monster={localMonster} />
			
			{localMonster.bloodied !== undefined && (
				<LegendaryMecanics monster={localMonster} />
			)}

			<ListStatus selectedStatuses={selectedStatuses} removeStatus={toggleStatus} />

			

		</div>
	);
}
