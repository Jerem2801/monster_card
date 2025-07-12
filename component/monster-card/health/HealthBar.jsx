'use client';

import { PlusIcon, MinusIcon } from '@heroicons/react/16/solid';
import { Button } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';
import { useHealth } from '@/component/monster-card/health/useHealth';
import HealtCalculatorModal from './HealthCalculatorModal';

export default function HealthBar({ hpMax, sendNewHp }) {
     const {
        currentHp,
        showTooltip,
        tooltipRef,
        setShowTooltip,
        updateHeal,
        closeTooltip,
    } = useHealth(hpMax, sendNewHp);


    function handleHeal(inputValue) {
        updateHeal(Number(inputValue));
        closeTooltip();
    }

    function handleDamage(inputValue) {
        updateHeal(-Number(inputValue));
        closeTooltip();
    }


    return (
        <div className="relative w-full" ref={tooltipRef}>
            <div
                className="relative flex items-center justify-center gap-3 overflow-hidden rounded-md border border-gray-300 px-3 py-1.5 shadow-sm"
                style={{
                    background: `linear-gradient(to right, ${
                        currentHp / hpMax <= 0.2
                            ? '#f87171'
                            : currentHp / hpMax <= 0.5
                              ? '#fbbf24'
                              : '#4ade80'
                    } ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%, #ffffff ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%)`,
                    borderRadius: '0.375rem',
                    padding: '0.25rem 0.75rem',
                    transition: 'background 0.3s',
                }}
                onClick={() => setShowTooltip(!showTooltip)}
            >
                <div className="flex items-center justify-center">
                    <Button
                        onClick={e => {
                            e.stopPropagation();
                            updateHeal(-1);
                        }}
                        color="red"
                        size="xs"
                        pill
                    >
                        <MinusIcon className="h-5 w-5" />
                    </Button>
                </div>

                <span className="flex h-8 w-20 items-center justify-center font-mono text-lg leading-none font-medium text-gray-700">
                    {currentHp} / {hpMax}
                </span>

                <Button
                    onClick={e => {
                        e.stopPropagation();
                        updateHeal(+1);
                    }}
                    color="green"
                    size="xs"
                    pill
                >
                    <PlusIcon className="h-5 w-5" />
                </Button>
            </div>
            
            <HealtCalculatorModal
                showTooltip={showTooltip}
                handleDamage={handleDamage}
                handleHeal={handleHeal}
            />
            
        </div>
    );
}
