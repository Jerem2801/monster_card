import { useEffect, useState } from 'react';
import { Popover } from 'flowbite-react';

import { getEffectToDisplay } from './lib/resultDisplayBoxUtils';

export default function ResultDisplayBox({ msg }) {
    const { name, format, result, advantage, monsterName, effect } = msg.text;

    const isCritic = result.type === 'critic';
    const isFailed = result.type === 'failed';

    const totalColor = isCritic
        ? 'text-green-600 border-green-400 bg-green-50 shadow-sm'
        : isFailed
          ? 'text-red-600 border-red-400 bg-red-50 shadow-sm'
          : 'text-gray-800 border-gray-300 bg-white';

    const getDiceStyle = dice => {
        const base = ['rounded px-1'];

        if (dice.primary) {
            base.push('font-bold underline');
        }

        if (dice.extra) {
            base.push('text-blue-500 font-semibold');
        }

        if (dice.discarded) {
            base.push('text-gray-400 line-through');
        }

        if (dice.kept && !dice.extra && !dice.primary) {
            base.push('text-gray-800');
        }

        return base.join(' ');
    };

    const detail = result.dices.map((dice, i) => (
        <span key={i} className="flex items-center">
            {i > 0 && <span className="mx-1 text-gray-400">+</span>}
            <span className={getDiceStyle(dice)}>{dice.value}</span>
        </span>
    ));

    const popoverContent = (
        <div className="w-64 text-sm text-gray-500">
            <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 text-center">
                <h3 className="font-semibold text-gray-900">
                    Détails du {result.diceProperty.numberDice}d{result.diceProperty.valueDice}
                </h3>
            </div>
            <div className="px-3 py-2 text-center">
                <div className="inline-flex flex-wrap justify-center">{detail}</div>
            </div>
        </div>
    );

    const effectToDisplay = getEffectToDisplay({ result, effect });

    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    const renderAdvantage = () => {
        if (advantage > 0)
            return <span className="ml-2 font-medium text-green-600">(+{advantage})</span>;
        if (advantage < 0)
            return <span className="ml-2 font-medium text-red-600">({advantage})</span>;
        return null;
    };

    return (
        <div className="flex flex-col rounded bg-gray-100 p-3">
            {/* Haut : nom + stats + résultat */}
            <div className="flex items-center justify-between">
                {/* Partie gauche */}
                <div className="flex flex-1 flex-col justify-between pr-4">
                    <div className="mb-1 text-base font-bold text-gray-800">{monsterName}</div>
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                        <span>
                            {name} : {format}
                        </span>
                        {renderAdvantage()}
                    </div>
                </div>

                {/* Partie droite */}
                <Popover content={popoverContent} trigger="hover">
                    <div
                        className={`flex h-12 w-12 flex-col items-center justify-center rounded border text-lg font-bold ${totalColor}`}
                        style={{
                            opacity: visible ? 1 : 0,
                            transition: 'opacity 0.5s ease',
                            pointerEvents: visible ? 'auto' : 'none',
                        }}
                    >
                        {isFailed ? '💀' : result.total}
                    </div>
                </Popover>
            </div>

            {/* Bas : effet critique */}
            {effectToDisplay}
        </div>
    );
}
