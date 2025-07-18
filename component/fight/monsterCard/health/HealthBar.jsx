'use client';

import { Popover } from 'flowbite-react';
import { useHealth } from './hook/useHealth';
import HealthCalculatorModal from './HealthCalculatorModal';
import HealthBarButton from './HealthBarButton';

export default function HealthBar({ hpMax, sendNewHp }) {
    const { currentHp, updateHealth, getHealthGradient } = useHealth(hpMax, sendNewHp);

    function handleHeal(inputValue) {
        updateHealth(Number(inputValue));
    }

    function handleDamage(inputValue) {
        updateHealth(-Number(inputValue));
    }

    return (
        <div className="w-full">
            <div
                className="flex w-full items-center justify-center gap-3 overflow-hidden rounded-md border border-gray-300 px-3 py-1.5 shadow-sm transition-colors duration-300"
                style={{
                    background: getHealthGradient(currentHp, hpMax),
                }}
            >
                <HealthBarButton updateHealth={() => updateHealth(-1)} color="red" icon="-" />

                <Popover
                    content={
                        <div className="w-64 text-sm text-gray-500">
                            <HealthCalculatorModal
                                handleDamage={handleDamage}
                                handleHeal={handleHeal}
                            />
                        </div>
                    }
                    placement="top"
                >
                    <span className="flex h-8 w-20 cursor-pointer items-center justify-center font-mono text-lg leading-none font-medium text-gray-700">
                        {currentHp} / {hpMax}
                    </span>
                </Popover>

                <HealthBarButton updateHealth={() => updateHealth(+1)} color="green" icon="+" />
            </div>
        </div>
    );
}
