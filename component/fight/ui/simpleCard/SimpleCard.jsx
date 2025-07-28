'use client';

import { useState } from 'react';

import StatPanel from '../monsterCard/headerPanel/StatPanel';
import HealPanel from './health/HealthPanel';
import StatusModal from '../editModal/EditModal';
import StatusPanel from '../StatusPanel';

import { DEADLY, DEAD } from '@/data/statusdata';

import HealthLegendaryPanel from '@/component/fight/ui/monsterCard/legendary/HealthLegendaryPanel';

import { getHealthBarProps } from './health/lib/healthCalculatorUtils';

export default function SimpleCard({
    monster,
    currentHp,
    currentHpLegendary,
    status,
    onHpChange,
    onHpLegendaryChange,
    onSelect,
    selected,
    deleteMode,
    onDelete,
    updateMonsterStatus,
    updateMonster,
}) {
    const [openModal, setOpenModal] = useState(false);

    const [useAlternateHealPanel, setUseAlternateHealPanel] = useState(false);

    const isLegendaryInLastStand =
        monster.legendary && status.some(s => s.id === DEADLY.id || s.id === DEAD.id);

    // HP logic
    function handleHeal(value) {
        const healedAmount = Number(value);
        if (!isNaN(healedAmount)) {
            onHpChange(currentHp + healedAmount);
        }
    }

    function handleDamage(value) {
        const damageAmount = Number(value);
        if (!isNaN(damageAmount)) {
            onHpChange(currentHp - damageAmount);
        }
    }

    // HP logic
    function handleHealLegendary(value) {
        const healedAmount = Number(value);
        if (!isNaN(healedAmount)) {
            onHpLegendaryChange(currentHpLegendary + healedAmount);
        }
    }

    function handleDamageLegendary(value) {
        const damageAmount = Number(value);
        if (!isNaN(damageAmount)) {
            onHpLegendaryChange(currentHpLegendary - damageAmount);
        }
    }

    // Dynamic health bar style

    const effectiveHp = isLegendaryInLastStand ? currentHpLegendary : currentHp;
    const effectiveMaxHp = isLegendaryInLastStand ? monster.last_stand?.hp : monster.hp;

    const { barColor, barWidth } = getHealthBarProps(
        effectiveHp,
        effectiveMaxHp,
        isLegendaryInLastStand,
        useAlternateHealPanel,
    );

    return (
        <div
            onClick={onSelect}
            className={`relative mb-4 cursor-pointer rounded-md border-2 transition-shadow duration-300 ${selected ? 'border-blue-500 bg-blue-50' : ''} ${monster.legendary && !selected ? 'border-yellow-400 bg-yellow-50' : ''} ${!monster.legendary && !selected ? 'border-gray-300 bg-white' : ''} `}
        >
            {/* Header */}
            <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* Left: Nom */}
                    <button
                        type="button"
                        onClick={e => {
                            e.stopPropagation();
                            onSelect();
                            setOpenModal(true);
                        }}
                        className="cursor-pointer px-1 transition duration-200 hover:text-blue-600"
                    >
                        <h2 className="text-lg font-bold">{monster.name}</h2>
                    </button>

                    {/* Right: Stats + HP */}
                    <div className="flex items-center gap-2">
                        <span>
                            <StatusPanel status={status} />
                        </span>
                        <StatPanel monster={monster} />
                        {isLegendaryInLastStand && !useAlternateHealPanel ? (
                            <HealthLegendaryPanel
                                currentHp={currentHpLegendary}
                                hpMax={monster.last_stand?.hp}
                                handleDamage={handleDamageLegendary}
                                handleHeal={handleHealLegendary}
                                toShow
                            />
                        ) : (
                            <HealPanel
                                currentHp={currentHp}
                                hpMax={monster.hp}
                                handleDamage={handleDamage}
                                handleHeal={handleHeal}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Health bar */}
            <div className="h-2 w-full border-t border-gray-300">
                <div
                    className={`h-full ${barColor} rounded-b-md transition-all duration-300`}
                    style={{ width: barWidth }}
                />
            </div>

            {/* Delete button */}
            {deleteMode && (
                <button
                    onClick={e => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="absolute top-2 right-2 rounded bg-red-300 px-2 py-0.5 text-xs text-white hover:bg-red-400"
                >
                    ❌
                </button>
            )}

            {isLegendaryInLastStand && !useAlternateHealPanel && (
                <button
                    onClick={e => {
                        e.stopPropagation();
                        setUseAlternateHealPanel(true);
                    }}
                    className="absolute top-11 right-2 rounded bg-green-300 px-2 py-0.5 text-xs text-white hover:bg-green-400"
                >
                    ⬆️
                </button>
            )}

            {isLegendaryInLastStand && useAlternateHealPanel && (
                <button
                    onClick={e => {
                        e.stopPropagation();
                        setUseAlternateHealPanel(false);
                    }}
                    className="absolute top-11 right-2 rounded bg-blue-300 px-2 py-0.5 text-xs text-white hover:bg-blue-400"
                >
                    ⬇️
                </button>
            )}

            {/* StatusModal */}
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
