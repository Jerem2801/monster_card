'use client'

import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import { Button } from 'flowbite-react';
import { useState } from 'react'

export default function ActionThrowModal({action}) {
    const [advantage,setAdantage] = useState(0);
    
    function getMinTotal({ numberDice, bonus }) {
        return 1 + numberDice + bonus;
    }

    function getMaxTotal({ numberDice, valueDice, bonus }) {
        return numberDice * valueDice + bonus;
    }


    return (
        <>
            <div className="w-50 text-sm text-gray-500 not-italic">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2">
                    <h3 className="text-center font-semibold text-gray-900">{'Dégâts '}
                        {'('}<span className="mr-1 text-red-500">{getMinTotal(action.dice)}</span>-
                        <span className="ml-1.5 text-green-500">{getMaxTotal(action.dice)}</span>{')'}</h3>
                </div>
                <div className="px-3 py-2 flex flex-col items-center space-y-4">
                    <SimpleInputNumber
                        label="Avantage"
                        min={-10}
                        max={10}
                        value={advantage}
                        onChange={e => setAdantage(Number(e.target.value))}
                    />
                    <Button>
                        Lancer les dés
                    </Button>
                </div>
                
            </div>
        </>
    );
}
