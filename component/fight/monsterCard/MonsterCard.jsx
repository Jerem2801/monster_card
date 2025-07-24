'use client';

import { useState } from 'react';

import NamePanel from './headerPanel/NamePanel';
import PassivePanel from './passive/PassivePanel';
import ActionPanel from './actions/ActionPanel';

import StatusModal from '../simpleCard/status/StatusModal';


export default function MonsterCard({ monster, addMonsterCard, status, updateMonsterStatus}) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="w-full space-y-4 rounded-2xl border border-neutral-300 bg-amber-50 p-6 shadow-lg transition-shadow hover:shadow-xl md:w-[70%]">
            <NamePanel 
                monster={monster} 
                status={status}
                updateMonsterStatus={updateMonsterStatus}
                setOpenModal={setOpenModal}/>

            <PassivePanel monster={monster} addMonsterCard={addMonsterCard} />

            <ActionPanel monster={monster} addMonsterCard={addMonsterCard} status={status} />

            <StatusModal
                openModal={openModal}
                onClose={() => setOpenModal(false)}
                status={status}
                updateMonsterStatus={updateMonsterStatus}
            />
        </div>
    );
}
