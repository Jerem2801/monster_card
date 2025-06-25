"use client";

import {useState} from "react";
import RemoveMonsterCardButton from "./RemoveMonsterCardButton";
//import StatusSelector from "./status/StatusSelector";
import EditModal from './edit/EditModal';
import NamePanel from "./NamePanel";
import PassivePanel from "./PassivePanel";
import HealButton from "./HealButton";
import HealButtonLegendary from "./legendary/HealButtonLegendary";
import AttacksButtons from "./actions/AttacksButtons";
import LegendaryMecanics,{updateLegendaryMonster2} from "./legendary/LegendaryMechanics";
import ListStatus from "./status/ListStatus";


export default function MonsterCard({ monster, removeMonsterCard }) {
	const [showEditModal, setShowEditModal] = useState(false);
	const [selectedStatuses, setSelectedStatuses] = useState([]);
	const [localMonster,setLocalMonster] = useState(monster);

	const [dead, setDead] = useState(false);

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

	function changeMonster(editMonster){
		setLocalMonster(editMonster);
	}



	return (
		<div className="w-[30%] p-4 space-y-3 border border-neutral-200 rounded-md bg-amber-50 shadow-md">

			{showEditModal && (<EditModal closeModal={() => setShowEditModal(false)} monster={localMonster} changeMonster={changeMonster} selectedStatuses={selectedStatuses} toggleStatus={toggleStatus} />)}
			
			{/*<RemoveMonsterCardButton removeMonsterCard={removeMonsterCard} />*/}

			<NamePanel monster={localMonster} openStatusModal={() => setShowEditModal(true)}/>
				
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
