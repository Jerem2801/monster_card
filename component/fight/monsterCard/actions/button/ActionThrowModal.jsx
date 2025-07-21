'use client';

import AdvantageInputNumber from './AdvantageInputNumber';
import { throwDice, formatDice } from '@/lib/diceutils';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useMessages } from '@/component/fight/resultDisplay/MessagesProvider';
import { getAdvantage } from '../lib/actionUtils'
import Image from 'next/image';
import { getDiceImagePath } from '../lib/actionUtils';

export default function ActionThrowModal({ action, monsterName, diceProperty }) {
    const [advantage, setAdvantage] = useState(0);
    const { addMessage } = useMessages();

    const modifiers = getAdvantage(action);
    const dicePath = getDiceImagePath(diceProperty);

    const cleanedActionName = action.name
            .replace(/^•\s*/, '') // enlève le "• " au début
            .replace(/\s*\([^)]*\)[.]?$/, '');

    function handleAction() {
        const resultDice = throwDice(diceProperty, advantage);        
        const diceFormat = formatDice(diceProperty);

        const message = {
            name: cleanedActionName,
            advantage: advantage,
            format: diceFormat,
            result: resultDice,
            monsterName: monsterName,
            effect: action.effect,
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
  <div className={`mx-auto rounded-xl not-italic bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-1 ring-gray-300 text-sm text-gray-700 ${
    modifiers.length > 0 ? 'w-90' : 'w-78'}`}>
    {/* Titre */}
    <div className="rounded-t-xl bg-gray-800 px-4 py-3">
      <h3 className="text-center font-semibold text-white tracking-wide">
        {cleanedActionName}
        <span className="text-sm font-medium text-gray-300">
          {' ('}
          <span className="text-red-400">{getMinTotal(diceProperty)}</span>–
          <span className="text-green-400">{getMaxTotal(diceProperty)}</span>
          {')'}
        </span>
      </h3>
    </div>

    {/* Modificateurs */}
    {modifiers.length > 0 && (
      <div className="px-4 py-3">
        <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wider">
          Avantage / Désavantage
        </h4>
        <ul className="space-y-2">
          {modifiers.map((mod, index) => (
            <li key={index} className="flex items-start gap-2">
              <span
                className={`text-xs font-semibold ${
                  mod.type === "advantage" ? "text-green-600" : "text-red-600"
                }`}
              >
                {mod.name}
              </span>
              <p className="text-xs text-gray-600">{mod.description}</p>
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Input + Bouton côte à côte et centrés */}
    <div className="flex flex-wrap justify-center items-center gap-3 px-4 py-4">
      <div className="min-w-[100px]">
        <AdvantageInputNumber
          min={-10}
          max={10}
          value={advantage}
          onChange={e => setAdvantage(Number(e.target.value))}
        />
      </div>
      <Button
        onClick={handleAction}
        className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white gap-2 text-sm font-medium py-2 px-4 rounded-md transition duration-150"
      >
        Lancer<Image src={dicePath} alt={dicePath} width={20} height={20} />
      </Button>
    </div>
  </div>
</>

    );
}
