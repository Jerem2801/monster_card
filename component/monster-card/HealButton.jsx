'use client';

import { PlusIcon, MinusIcon } from '@heroicons/react/16/solid';
import { Button } from 'flowbite-react';
import { useState, useRef, useEffect } from 'react';

export default function HealButton({ hpMax, sendNewHp }) {
    const [currentHp, setCurrentHp] = useState(hpMax);
    const [showTooltip, setShowTooltip] = useState(false);
    const [inputValue, setInputValue] = useState(0);
    const tooltipRef = useRef(null);

    function updateHeal(addValue) {
        const newHp = Math.max(0, Math.min(hpMax, currentHp + addValue));
        setCurrentHp(newHp);
        sendNewHp(newHp);
    }

    function handleHeal() {
        updateHeal(Number(inputValue));
        closeTooltip();
    }

    function handleDamage() {
        updateHeal(-Number(inputValue));
        closeTooltip();
    }

    function closeTooltip() {
        setShowTooltip(false);
        setInputValue(0);
    }

    // Ferme la tooltip si clic en dehors
    useEffect(() => {
        function handleClickOutside(event) {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
                closeTooltip();
            }
        }
        if (showTooltip) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showTooltip]);

    return (
        <div className="relative w-full" ref={tooltipRef}>
            <div
                className="flex items-center justify-center gap-3 relative overflow-hidden border border-gray-300 rounded-md px-3 py-1.5 shadow-sm"
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

                <span className="flex h-8 w-20 items-center justify-center font-mono text-lg font-medium text-gray-700 leading-none">
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

            {showTooltip && (
                <div className="absolute z-10 top-full mt-2 left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md shadow-md p-3 w-35">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleHeal}
                            className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-1 rounded"
                        >
                            Soin
                        </button>
                        <input
                            type="number"
                            className="w-full border rounded px-2 py-1 text-sm"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            min={0}
                        />
                        <button
                            onClick={handleDamage}
                            className="w-full bg-red-600 hover:bg-red-700 text-white text-sm py-1 rounded"
                        >
                            Dégâts
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
