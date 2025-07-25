'use client';

import { useState } from 'react';

import NamePanel from './headerPanel/NamePanel';
import PassivePanel from './passive/PassivePanel';
import ActionPanel from './actions/ActionPanel';

import StatusModal from '../simpleCard/edit/status/StatusModal';


export default function MonsterCard({ monster, addMonsterCard, status, updateMonsterStatus,updateMonster}) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="space-y-3 rounded-2xl border-2 border-neutral-300 p-6 pb-0 transition-shadow hover:shadow-lg">
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
                updateMonster={updateMonster}
                monster={monster}
            />
        </div>
    );
}
