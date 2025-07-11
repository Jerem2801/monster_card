'use client';

import { useState } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/16/solid';
import { Button } from 'flowbite-react';

export default function HealButtonLegendary({ hpMax }) {
    const [currentHp, setCurrentHp] = useState(hpMax);

    function addHeal() {
        let newHp = currentHp + 1;
        if (newHp > hpMax) {
            newHp = currentHp;
        }
        return setCurrentHp(newHp);
    }

    function removeHeal() {
        let newHp = currentHp - 1;
        if (newHp < 0) {
            newHp = currentHp;
        }
        return setCurrentHp(newHp);
    }

    return (
        <div
            className="relative flex items-center justify-center gap-3 overflow-hidden rounded-md border border-gray-300 px-3 py-1.5 shadow-sm"
            style={{
                background: `linear-gradient(to right, #3b82f6 ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%, #ffffff ${Math.max(0, Math.min(100, (currentHp / hpMax) * 100))}%)`,
                borderRadius: '0.375rem',
                padding: '0.25rem 0.75rem',
                transition: 'background 0.3s',
            }}
        >
            <div className="flex items-center justify-center">
                <Button
                    onClick={() => {
                        removeHeal();
                    }}
                    color="red"
                    size="xs"
                    pill
                    iconOnly
                >
                    <MinusIcon className="h-5 w-5" />
                </Button>
            </div>

            <span className="flex h-8 w-20 items-center justify-center font-mono text-lg leading-none font-medium text-gray-700">
                {currentHp} / {hpMax}
            </span>

            <Button onClick={() => addHeal()} color="green" size="xs" pill iconOnly>
                <PlusIcon className="h-5 w-5" />
            </Button>
        </div>
    );
}
