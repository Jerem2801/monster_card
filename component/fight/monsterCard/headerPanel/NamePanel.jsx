import { useMemo } from 'react';
import StatPanel from './StatPanel';
import { formatMonsterName } from './lib/headerPanelUtils';

export default function NamePanel({ monster, openStatusModal }) {
    // Robustesse : fallback si monster ou monster.size n'est pas défini
    const monsterName = useMemo(() => formatMonsterName(monster?.name), [monster?.name]);
    const monsterLevel = monster?.level ?? '?';
    const monsterSizeLabel = monster?.size?.id != null ? `, ${monster.size.label}` : '';

    return (
        <div className="flex flex-wrap items-baseline gap-2">
            <div className="flex flex-wrap font-semibold">
                    {monsterName}
            </div>
            <span className="text-sm text-gray-500">
                Niv. {monsterLevel}
                {monsterSizeLabel}
            </span>
            <StatPanel monster={monster} />
        </div>
    );
}
