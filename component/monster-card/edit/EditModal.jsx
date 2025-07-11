import { useState } from "react";
import StatusSelector from "@/component/monster-card/status/StatusSelector"

export default function EditModal({ closeModal, monster, changeMonster,selectedStatuses,toggleStatus,removeMonsterCard,setSelectedStatuses }) {
	const [editMonster, setEditMonster] = useState(monster);

	const updateField = (field, value) => {
            setEditMonster((prev) => ({ ...prev, [field]: value }));
	};
    
	const sendEditMonster = () => {
		changeMonster(editMonster);
		closeModal();
	};

	const removeMonster = () => {
		removeMonsterCard();
		closeModal();
	}

	return (
		<div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-white rounded-2xl shadow-xl p-6 w-[400px] space-y-5 border border-gray-200">

				<h2 className="text-lg font-semibold text-gray-800 text-center border-b pb-2">Éditer le Monstre</h2>

				{/* Nom */}
				<div className="flex items-center">
					<label htmlFor="name" className="w-28 text-sm font-medium text-gray-600">
						Nom
					</label>
					<input
						className="flex-1 border border-gray-300 p-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
						type="text"
						id="name"
						value={editMonster.name}
						onChange={(e) => updateField("name", e.target.value)}
					/>
				</div>

				{/* Armure */}
				<div className="flex items-center">
					<label htmlFor="armor" className="w-28 text-sm font-medium text-gray-600">
						Armure
					</label>
					<select
						id="armor"
						className="flex-1 border border-gray-300 p-2 rounded-md text-gray-800 bg-white"
						value={editMonster.armor || "Aucune"}
						onChange={(e) => updateField("armor", e.target.value)}
					>
						<option value="none">Aucune</option>
						<option value="M">Moyenne</option>
						<option value="L">Lourde</option>
					</select>
				</div>

				{/* Mouvement */}
               <div className="flex items-center">
                    <label className="w-28 text-sm text-gray-600">Vitesse</label>
                    <input
                        type="number"
                        className="flex-1 border border-gray-300 p-2 rounded-md text-gray-800"
                        value={editMonster.speed || ""}
                        onChange={(e) => updateField("speed", e.target.value)}
                    />
                </div>

				{/* Save */}
                <div className="flex items-center">
                    <label className="w-28 text-sm text-gray-600">JdS</label>
                    <input
                        type="text"
                        className="flex-1 border border-gray-300 p-2 rounded-md text-gray-800"
                        value={editMonster.save || ""}
                        onChange={(e) => updateField("save", e.target.value)}
                    />
                </div>

                {/* Status */}
                <StatusSelector selectedStatuses={selectedStatuses} toggleStatus={toggleStatus} setSelectedStatuses={setSelectedStatuses}/>
				

				{/* Actions */}
				<div className="flex justify-center gap-3 border-t pt-3">
					<button
						className="flex-1 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
						onClick={closeModal}
					>
						Annuler
					</button>
					<button
						className="flex-1 px-4 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
						onClick={removeMonster}
					>
						Supprimer
					</button>

					<button
						className="flex-1 px-4 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
						onClick={sendEditMonster}
					>
						OK
					</button>
				</div>

                
			</div>
		</div>
	);
}
