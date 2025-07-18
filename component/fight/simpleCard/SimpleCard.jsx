import { getHealthBarProps } from './health/lib/healthCalculatorUtils';
import StatPanel from '../monsterCard/headerPanel/StatPanel';
import HealPanel from './health/HealthPanel';

export default function SimpleCard({ monster, currentHp, onHpChange, onSelect, selected, deleteMode,onDelete }) {
    // HP logic
    function handleHeal(value) {
        const healedAmount = Number(value);
        if (!isNaN(healedAmount)) {
            onHpChange(currentHp + healedAmount);
        }
    }

    function handleDamage(value) {
        const damageAmount = Number(value);
        if (!isNaN(damageAmount)) {
            onHpChange(currentHp - damageAmount);
        }
    }

    // Dynamic health bar style
    const { barColor, barWidth } = getHealthBarProps(currentHp, monster.hp);

    return (
        <div
            onClick={onSelect}
            className={`relative mb-4 cursor-pointer rounded-md border-2 transition hover:shadow-md ${
                selected ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-white'
            }`}
>
            {/* Header */}
            <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    {/* Left: Nom */}
                    <h2 className="text-lg font-bold">{monster.name}</h2>

                    {/* Right: Stats + HP */}
                    <div className="flex items-center gap-2">
                        <StatPanel monster={monster} />
                        <HealPanel
                            currentHp={currentHp}
                            hpMax={monster.hp}
                            handleDamage={handleDamage}
                            handleHeal={handleHeal}
                        />
                    </div>
                </div>
            </div>

            {/* Health bar */}
            <div className="h-2 w-full border-t border-gray-300">
                <div
                    className={`h-full ${barColor} rounded-b-md transition-all duration-300`}
                    style={{ width: barWidth }}
                />
            </div>
            {deleteMode && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // ne déclenche pas onSelect
                        onDelete();
                    }}
                    className="absolute right-2 top-2 rounded bg-red-300 px-2 py-0.5 text-xs text-white hover:bg-red-400"
                >
                    ❌
                </button>
            )}
        </div>
    );
}
