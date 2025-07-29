'use client';

import { useState } from 'react';

import NamePanel from './headerPanel/NamePanel';
import PassivePanel from './passive/PassivePanel';
import ActionPanel from './actions/ActionPanel';

import StatusModal from '../editModal/EditModal';
import LegendaryPanel from './legendary/LegendaryPanel';

export default function MonsterCard({
    monster,
    addMonsterCard,
    status,
    updateMonsterStatus,
    updateMonster,
    nbHeroes
}) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div
            className={`space-y-3 rounded-2xl border-2 p-6 transition-shadow hover:shadow-lg ${monster.legendary ? 'border-yellow-400 bg-yellow-50 ring-1 ring-yellow-200' : 'border-neutral-300 bg-white'} `}
        >
            <NamePanel
                monster={monster}
                status={status}
                updateMonsterStatus={updateMonsterStatus}
                setOpenModal={setOpenModal}
            />

            <PassivePanel monster={monster} addMonsterCard={addMonsterCard} nbHeroes={nbHeroes}/>

            <ActionPanel monster={monster} addMonsterCard={addMonsterCard} status={status} nbHeroes={nbHeroes}/>

            {monster.legendary && <LegendaryPanel monster={monster} />}

            <StatusModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                status={status}
                updateMonsterStatus={updateMonsterStatus}
                updateMonster={updateMonster}
                monster={monster}
            />
        </div>
    );
}
