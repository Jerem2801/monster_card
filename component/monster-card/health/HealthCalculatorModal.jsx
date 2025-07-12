'use client'

import {useState} from 'react'

export default function HealtCalculatorModal({showTooltip,handleHeal,handleDamage}){
    const [inputValue, setInputValue] = useState(0);
    return (
        <>
            {showTooltip && (
                <div className="absolute top-full left-1/2 z-10 mt-2 w-35 -translate-x-1/2 rounded-md border border-gray-300 bg-white p-3 shadow-md">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => {
                                    handleHeal(inputValue);
                                    setInputValue(0);
                                }
                            }
                            className="w-full rounded bg-green-600 py-1 text-sm text-white hover:bg-green-700"
                        >
                            Soin
                        </button>
                        <input
                            type="number"
                            className="w-full rounded border px-2 py-1 text-sm"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                            min={0}
                        />
                        <button
                            onClick={() => {
                                    handleDamage(inputValue);
                                    setInputValue(0);
                                }
                            }
                            className="w-full rounded bg-red-600 py-1 text-sm text-white hover:bg-red-700"
                        >
                            Dégâts
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}