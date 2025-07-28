'use client';

import AdvantageInputNumber from './AdvantageInputNumber';
import { throwDice, formatDice } from '@/lib/diceutils';
import { Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useMessages } from '@/component/fight/ui/resultDisplay/MessagesProvider';
import { getAdvantage } from '../lib/actionUtils';
import Image from 'next/image';
import { getDiceImagePath } from '../lib/actionUtils';

import { Label, TextInput, Select } from 'flowbite-react';

function getDiceOptions({ isMinion, action }) {
    return {
        vicious: !!action.vicious,
        brutal: !!action.brutal,
        noCrit: isMinion || !!action.AOE,
        noFail: !!action.AOE,
        forceCrit: !!action.forceCrit
    };
}

export default function ActionThrowModal({ action, monsterName, diceProperty, status, isMinion }) {
    const [advantage, setAdvantage] = useState(0);
    const { addMessage } = useMessages();

    const [localDice, setLocalDice] = useState(diceProperty);

    const modifiers = getAdvantage(action, status);
    const dicePath = getDiceImagePath(localDice);

    const cleanedActionName = action.name.replace(/^•\s*/, '').replace(/\s*\([^)]*\)[.]?$/, '');

    // Options d'initialisation
    const baseOptions = getDiceOptions({ isMinion, action });
    const [manualOptions, setManualOptions] = useState(baseOptions);

    // Sync options si action ou isMinion changent
    useEffect(() => {
        setManualOptions(getDiceOptions({ isMinion, action }));
    }, [action, isMinion]);

    // Toggle checkbox options
    function handleOptionChange(option) {
        setManualOptions(prev => ({
            ...prev,
            [option]: !prev[option],
        }));
    }

    function handleAction() {
        const resultDice = throwDice(localDice, advantage, manualOptions);
        const diceFormat = formatDice(localDice);

        const message = {
            name: cleanedActionName,
            advantage,
            format: diceFormat,
            result: resultDice,
            monsterName,
            effect: action.effect,
        };

        addMessage(message);
    }

    function updateDiceProp(key, value) {
        setLocalDice(prev => ({
            ...prev,
            [key]: parseInt(value || '0', 10),
        }));
    }

    function getMinTotal({ numberDice, bonus }) {
        return 1 + numberDice + bonus;
    }

    function getMaxTotal({ numberDice, valueDice, bonus }) {
        return numberDice * valueDice + bonus;
    }

    return (
        <>
            <div
                className={`mx-auto bg-gradient-to-br from-gray-100 to-gray-200 text-sm text-gray-700 not-italic shadow-lg ring-1 ring-gray-300 ${
                    modifiers.length > 0 ? 'w-90' : 'w-78'
                }`}
            >
                {/* Titre */}
                <div className="bg-gray-800 px-4 py-3">
                    <h3 className="text-center font-semibold tracking-wide text-white">
                        {cleanedActionName}
                        <span className="text-sm font-medium text-gray-300">
                            {' ('}
                            <span className="text-red-400">{getMinTotal(localDice)}</span>–
                            <span className="text-green-400">{getMaxTotal(localDice)}</span>
                            {')'}
                        </span>
                    </h3>
                </div>

                {/* Édition des dés */}
                <div className="border-t border-gray-300 px-4 py-3">
                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Propriétés du Lancer
                    </h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                    
                        <div>
                            <Label htmlFor="numberDice">Nb de dés</Label>
                            <TextInput
                                id="numberDice"
                                type="number"
                                min={1}
                                value={localDice.numberDice}
                                onChange={e => updateDiceProp('numberDice', e.target.value)}
                                style={{ textAlign: 'center' }}
                            />
                        </div>
                        <div>
                            <Label htmlFor="valueDice">Valeur dé</Label>
                            <Select
                                className="text-center"
                                id="valueDice"
                                value={localDice.valueDice}
                                onChange={e => updateDiceProp('valueDice', e.target.value)}
                                style={{ textAlign: 'center' }}
                            >
                                {[4, 6, 8, 10, 12, 20].map(die => (
                                    <option key={die} value={die}>
                                        d{die}
                                    </option>
                                ))}
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="bonus">Bonus</Label>
                            <TextInput
                                className="text-center"
                                id="bonus"
                                type="number"
                                value={localDice.bonus}
                                style={{ textAlign: 'center' }}
                                onChange={e => updateDiceProp('bonus', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Options de lancer */}
                <div className="border-t border-gray-300 px-4 py-3">
                    <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                        Options de lancer
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                        {[
                            ['forceCrit', 'Force un critique'],
                            ['noCrit', 'Pas de critique'],
                            ['noFail', 'Pas d’échec'],
                            ['vicious', 'Vicious'],
                            ['brutal', 'Brutal'],
                        ].map(([key, label]) => (
                            <label key={key} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={manualOptions[key]}
                                    onChange={() => handleOptionChange(key)}
                                />
                                {label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Modificateurs */}
                {modifiers.length > 0 && (
                    <div className="space-y-4 px-4 py-3 border-t border-gray-300">
                        {/* Avantages */}
                        {modifiers.some(mod => mod.type === 'advantage') && (
                            <div>
                                <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    Avantages
                                </h4>
                                <ul className="space-y-2">
                                    {modifiers
                                        .filter(mod => mod.type === 'advantage')
                                        .map((mod, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-xs font-semibold text-green-600">
                                                    {mod.name}
                                                </span>
                                                <p className="text-xs text-gray-600">
                                                    {mod.description}
                                                </p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}

                        {/* Désavantages */}
                        {modifiers.some(mod => mod.type === 'disadvantage') && (
                            <div className="border-t border-gray-500 pt-4">
                                <h4 className="mb-2 text-xs font-semibold tracking-wider text-gray-600 uppercase">
                                    Désavantages
                                </h4>
                                <ul className="space-y-2">
                                    {modifiers
                                        .filter(mod => mod.type === 'disadvantage')
                                        .map((mod, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <span className="text-xs font-semibold text-red-600">
                                                    {mod.name}
                                                </span>
                                                <p className="text-xs text-gray-600">
                                                    {mod.description}
                                                </p>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}



                {/* Input + Bouton côte à côte et centrés */}
                <div className="flex flex-wrap items-center justify-center gap-3 px-4 py-4">
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
                        className="flex-shrink-0 min-w-30 gap-2 rounded-md cursor-pointer bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition duration-150 hover:bg-indigo-700"
                    >
                        {/* Dés normaux */}
                        {Array.from({ length: localDice.numberDice }).map((_, index) => (
                            <Image
                                key={`normal-${index}`}
                                src={dicePath}
                                alt={`Dé ${index + 1}`}
                                width={20}
                                height={20}
                                className="inline-block"
                            />
                        ))}

                        {/* Bonus numérique */}
                        {localDice.bonus !== 0 && (
                            <span className="text-sm font-semibold">
                                {localDice.bonus > 0 ? `+${localDice.bonus}` : localDice.bonus}
                            </span>
                        )}
                    </Button>

                </div>
            </div>
        </>
    );
}
