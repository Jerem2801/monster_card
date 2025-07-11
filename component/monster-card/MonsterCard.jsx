'use client';

import { useState } from 'react';
import EditModal from '@/component/monster-card/edit/EditModal';
import NamePanel from '@/component/monster-card/NamePanel';
import PassivePanel from '@/component/monster-card/PassivePanel';
import HealButton from '@/component/monster-card/HealButton';
import HealButtonLegendary from '@/component/monster-card/legendary/HealButtonLegendary';
import AttacksButtons from '@/component/monster-card/actions/AttacksButtons';
import LegendaryMecanics from '@/component/monster-card/legendary/LegendaryMechanics';
import ListStatus from '@/component/monster-card/status/ListStatus';
import { toggleStatus } from '@/component/monster-card/status/testStatus';
import { useMonsterCard } from '@/component/monster-card/useMonsterCard';

export default function MonsterCard({ monster, removeMonsterCard }) {
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

            <HealButton hpMax={localMonster.hp} sendNewHp={handleNewHP} />

            {dead && localMonster.legendary === true && (
                <HealButtonLegendary hpMax={localMonster.lastStand.hp} />
            )}

            <PassivePanel monster={localMonster} />

            <AttacksButtons monster={localMonster} />

            {localMonster.bloodied != null && <LegendaryMecanics monster={localMonster} />}

            <ListStatus
                selectedStatuses={selectedStatuses}
                removeStatus={toggleStatus}
                setSelectedStatuses={setSelectedStatuses}
            />
        </div>
    );
}
