'use client';

import { useState } from 'react';

import { toggleStatus } from './status/testStatus';
import { useMonsterCard } from './hook/useMonsterCard';

import NamePanel from './headerPanel/NamePanel';
import HealthBar from './health/HealthBar';

import EditModal from './edit/EditModal';
import ListStatus from './status/ListStatus';
import PassivePanel from './passive/PassivePanel';

import ActionPanel from './actions/ActionPanel';

import HealButtonLegendary from './legendary/HealButtonLegendary';
import LegendaryMecanics from './legendary/LegendaryMechanics';

export default function MonsterCard({ monster, removeMonsterCard, addMonsterCard }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const {
        localMonster,
        setLocalMonster,
        selectedStatuses,
        setSelectedStatuses,
        dead,
        handleNewHP,
    } = useMonsterCard(monster);

    function changeMonster(editMonster) {
        setLocalMonster(editMonster);
    }

    return (
        <div className="w-full space-y-3 rounded-md border border-neutral-200 bg-amber-50 p-4 shadow-md md:w-[48%] xl:w-[30%]">
            {showEditModal && (
                <EditModal
                    closeModal={() => setShowEditModal(false)}
                    monster={localMonster}
                    changeMonster={changeMonster}
                    selectedStatuses={selectedStatuses}
                    toggleStatus={toggleStatus}
                    removeMonsterCard={removeMonsterCard}
                    setSelectedStatuses={setSelectedStatuses}
                />
            )}

            <NamePanel monster={localMonster} openStatusModal={() => setShowEditModal(true)} />

            <HealthBar hpMax={localMonster.hp} sendNewHp={handleNewHP} />

            {dead && localMonster.legendary === true && (
                <HealButtonLegendary hpMax={localMonster.lastStand.hp} />
            )}

            <PassivePanel monster={localMonster} />

            <ActionPanel monster={localMonster} addMonsterCard={addMonsterCard} />

            {localMonster.bloodied != null && <LegendaryMecanics monster={localMonster} />}

            <ListStatus
                selectedStatuses={selectedStatuses}
                removeStatus={toggleStatus}
                setSelectedStatuses={setSelectedStatuses}
            />
        </div>
    );
}
