import { useState } from 'react';

import StatusSelector from '../../component/fight/simpleCard/status/StatusSelector';
import { getArmorType } from '@/lib/monsterUtils';

export default function EditModal({
    closeModal,
    monster,
    changeMonster,
    selectedStatuses,
    toggleStatus,
    removeMonsterCard,
    setSelectedStatuses,
}) {
    const [editMonster, setEditMonster] = useState(monster);

    const updateField = (field, value) => {
        setEditMonster(prev => ({ ...prev, [field]: value }));
    };

    const sendEditMonster = () => {
        changeMonster(editMonster);
        closeModal();
    };

    const removeMonster = () => {
        removeMonsterCard();
        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-[400px] space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                <h2 className="border-b pb-2 text-center text-lg font-semibold text-gray-800">
                    Éditer le Monstre
                </h2>

                {/* Nom */}
                <div className="flex items-center">
                    <label htmlFor="name" className="w-28 text-sm font-medium text-gray-600">
                        Nom
                    </label>
                    <input
                        className="flex-1 rounded-md border border-gray-300 p-2 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        type="text"
                        id="name"
                        value={editMonster.name}
                        onChange={e => updateField('name', e.target.value)}
                    />
                </div>

                {/* Armure */}
                <div className="flex items-center">
                    <label htmlFor="armor" className="w-28 text-sm font-medium text-gray-600">
                        Armure
                    </label>
                    <select
                        id="armor"
                        className="flex-1 rounded-md border border-gray-300 bg-white p-2 text-gray-800"
                        value={editMonster.armor?.id ?? ''}
                        onChange={e => {
                            const armorObj = getArmorType(e.target.value);
                            updateField('armor', armorObj);
                        }}
                    >
                        <option value="">Aucune</option>
                        <option value="M">Moyenne</option>
                        <option value="H">Lourde</option>
                    </select>
                </div>

                {/* Mouvement */}
                <div className="flex items-center">
                    <label className="w-28 text-sm text-gray-600">Vitesse</label>
                    <input
                        type="number"
                        className="flex-1 rounded-md border border-gray-300 p-2 text-gray-800"
                        value={editMonster.speed || ''}
                        onChange={e => updateField('speed', e.target.value)}
                    />
                </div>

                {/* Save */}
                <div className="flex items-center">
                    <label className="w-28 text-sm text-gray-600">JdS</label>
                    <input
                        type="text"
                        className="flex-1 rounded-md border border-gray-300 p-2 text-gray-800"
                        value={editMonster.save || ''}
                        onChange={e => updateField('save', e.target.value)}
                    />
                </div>

                {/* Status */}
                <StatusSelector
                    selectedStatuses={selectedStatuses}
                    toggleStatus={toggleStatus}
                    setSelectedStatuses={setSelectedStatuses}
                />

                {/* Actions */}
                <div className="flex justify-center gap-3 border-t pt-3">
                    <button
                        className="flex-1 rounded-md bg-blue-600 px-4 py-1 text-sm font-medium text-white hover:bg-blue-700"
                        onClick={closeModal}
                    >
                        Annuler
                    </button>
                    <button
                        className="flex-1 rounded-md bg-red-600 px-4 py-1 text-sm font-medium text-white hover:bg-red-700"
                        onClick={removeMonster}
                    >
                        Supprimer
                    </button>

                    <button
                        className="flex-1 rounded-md bg-green-600 px-4 py-1 text-sm font-medium text-white hover:bg-green-700"
                        onClick={sendEditMonster}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}
