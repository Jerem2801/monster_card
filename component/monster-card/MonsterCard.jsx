'use client';

import { useState } from 'react';

import { toggleStatus } from '@/component/monster-card/status/testStatus';
import { useMonsterCard } from '@/component/monster-card/useMonsterCard';

import NamePanel from '@/ui/monsterCard/headerPanel/NamePanel';
import HealthBar from '@/component/monster-card/health/HealthBar';

import PassivePanel from '@/component/monster-card/passive/PassivePanel';
import EditModal from '@/component/monster-card/edit/EditModal';

import HealButtonLegendary from '@/component/monster-card/legendary/HealButtonLegendary';
import ActionPanel from '@/component/monster-card/actions/ActionPanel';
import LegendaryMecanics from '@/component/monster-card/legendary/LegendaryMechanics';
import ListStatus from '@/component/monster-card/status/ListStatus';

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

            <HealthBar hpMax={localMonster.hp} sendNewHp={handleNewHP} />

            {dead && localMonster.legendary === true && (
                <HealButtonLegendary hpMax={localMonster.lastStand.hp} />
            )}

            <PassivePanel monster={localMonster} />

            <ActionPanel monster={localMonster} />

            {localMonster.bloodied != null && <LegendaryMecanics monster={localMonster} />}

            <ListStatus
                selectedStatuses={selectedStatuses}
                removeStatus={toggleStatus}
                setSelectedStatuses={setSelectedStatuses}
            />
        </div>
    );
}
