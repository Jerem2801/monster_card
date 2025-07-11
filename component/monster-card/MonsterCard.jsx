'use client';

import { useState } from 'react';
import EditModal from '@/component/monster-card/edit/EditModal';
import NamePanel from '@/component/monster-card/NamePanel';
import PassivePanel from '@/component/monster-card/PassivePanel';
import HealButton from '@/component/monster-card/HealButton';
import HealButtonLegendary from '@/component/monster-card/legendary/HealButtonLegendary';
import AttacksButtons from '@/component/monster-card/actions/AttacksButtons';
import LegendaryMecanics, {
    updateLegendaryMonster2,
} from '@/component/monster-card/legendary/LegendaryMechanics';
import ListStatus from '@/component/monster-card/status/ListStatus';
import { toggleStatus } from '@/component/monster-card/status/testStatus';

export default function MonsterCard({ monster, removeMonsterCard }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [localMonster, setLocalMonster] = useState(monster);
    const [dead, setDead] = useState(false);

    function isBloodied(bloodied) {
        if (bloodied && !selectedStatuses.includes('bloodied')) {
            setSelectedStatuses(prev => [...prev, 'bloodied']);
        } else if (!bloodied) {
            setSelectedStatuses(prev => prev.filter(s => s !== 'bloodied'));
        }
    }

    function putToDead(newHp) {
        let statusDead = 'dead';
        if (monster.legendary) {
            statusDead = 'deadly';
        }

        if (newHp === 0 && !selectedStatuses.includes(statusDead)) {
            setSelectedStatuses(prev => [...prev, statusDead]);
            setDead(true);
        } else if (newHp > 0) {
            setSelectedStatuses(prev => prev.filter(s => s !== statusDead));
            setDead(false);
        }
    }

    function updateLegendaryMonster(newHp) {
        let updatedMonster = structuredClone(localMonster);
        updateLegendaryMonster2(updatedMonster, newHp);
        setLocalMonster(updatedMonster);
    }

    function changeMonster(editMonster) {
        setLocalMonster(editMonster);
    }

    function handleNewHP(newHp) {
        if (newHp >= localMonster.hp / 2) {
            isBloodied(false);
        } else if (newHp <= localMonster.hp / 2) {
            isBloodied(true);
        }
        putToDead(newHp);

        if (localMonster.legendary) {
            updateLegendaryMonster(newHp);
        }
    }

    return (
        <div className="w-[30%] p-4 space-y-3 border border-neutral-200 rounded-md bg-amber-50 shadow-md">
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

            {localMonster.bloodied !== undefined && <LegendaryMecanics monster={localMonster} />}

            <ListStatus
                selectedStatuses={selectedStatuses}
                removeStatus={toggleStatus}
                setSelectedStatuses={setSelectedStatuses}
            />
        </div>
    );
}
