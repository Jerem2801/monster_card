'use client'

import { useMemo } from 'react';
import StatPanel from './StatPanel';
import { formatMonsterName } from './lib/headerPanelUtils';
import StatusPanel from '../../simpleCard/edit/status/StatusPanel';

export default function NamePanel({ monster,status, updateMonsterStatus,setOpenModal }) {
    // Robustesse : fallback si monster ou monster.size n'est pas défini
    const monsterName = useMemo(() => formatMonsterName(monster?.name), [monster?.name]);
    const monsterLevel = monster?.level ?? '?';
    const monsterSizeLabel = monster?.size?.id != null ? `, ${monster.size.label}` : '';

    return (
        <div className="flex flex-wrap items-baseline gap-1">
            <button
                type="button"
                onClick={e => {
                    e.stopPropagation();
                    setOpenModal(true);
                }}
                className="cursor-pointer px-1 transition duration-200 hover:text-blue-600"
            >
                <div className="flex flex-wrap font-bold it">{monsterName}</div>
                
            </button>
            <span className="text-sm text-gray-500">
                Niv. {monsterLevel}
                {monsterSizeLabel}
            </span>
           
            <div className="ml-auto flex items-baseline gap-2">
                <StatusPanel status={status} />
                <StatPanel monster={monster} />
            </div>
        </div>
    );
}
