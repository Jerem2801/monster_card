'use client';

import { useState } from 'react';

export default function HealthCalculatorModal({ handleHeal, handleDamage }) {
    const [inputValue, setInputValue] = useState('');

    return (
        <>
            <div className="p-3">
                <div className="flex w-25 flex-col gap-2">
                    <button
                        onClick={() => {
                            handleDamage(inputValue);
                            setInputValue(0);
                        }}
                        className="w-full rounded bg-red-600 py-1 text-sm text-white hover:bg-red-700"
                    >
                        Dégâts
                    </button>
                    <input
                        type="number"
                        className="no-spinner block h-10 w-full rounded border-x-0 border-black bg-gray-200 py-2 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        min={0}
                    />
                    <button
                        onClick={() => {
                            handleHeal(inputValue);
                            setInputValue(0);
                        }}
                        className="w-full rounded bg-green-600 py-1 text-sm text-white hover:bg-green-700"
                    >
                        Soin
                    </button>
                </div>
            </div>
        </>
    );
}
