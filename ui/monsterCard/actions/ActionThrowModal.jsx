'use client';

import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import { throwDice, formatDice } from '@/lib/diceutils';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useMessages } from '@/component/fight/resultDisplay/MessagesProvider';

export default function ActionThrowModal({ action,monsterName }) {
    const [advantage, setAdvantage] = useState(0);
    const { addMessage } = useMessages();
    
    function handleAction() {
        const resultDice = throwDice(action.dice, advantage);
        const cleanedActionName = action.name
  .replace(/^•\s*/, '')          // enlève le "• " au début
  .replace(/\s*\([^)]*\)[.]?$/, '');
        const diceFormat = formatDice(action.dice);
        
        const message = {
            name: cleanedActionName,
            advantage: advantage,
            format: diceFormat,
            result: resultDice,
            monsterName: monsterName
        };

        addMessage(message);
    }

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
                    <h3 className="text-center font-semibold text-gray-900">
                        {action.name}
                        {' ('}
                        <span className="mr-1 text-red-500">{getMinTotal(action.dice)}</span>-
                        <span className="ml-1.5 text-green-500">{getMaxTotal(action.dice)}</span>
                        {')'}
                    </h3>
                </div>
                <div className="flex flex-col items-center space-y-4 px-3 py-2">
                    <SimpleInputNumber
                        label="Avantage"
                        min={-10}
                        max={10}
                        value={advantage}
                        onChange={e => setAdvantage(Number(e.target.value))}
                    />
                    <Button onClick={handleAction}>Lancer les dés</Button>
                </div>
            </div>
        </>
    );
}
