import { Popover } from 'flowbite-react';
import HealthCalculatorModal from './HealthCalculatorModal';

export default function HealthPanel({ hpMax, currentHp, handleDamage, handleHeal }) {
    return (
        <Popover
            content={
                <div className="text-sm text-gray-500">
                    <HealthCalculatorModal handleDamage={handleDamage} handleHeal={handleHeal} />
                </div>
            }
            placement="left"
        >
            <span
                onClick={e => e.stopPropagation()}
                className="w-23 cursor-pointer rounded-md border-2 border-gray-300 p-2 text-center text-sm font-semibold transition-colors hover:bg-gray-300"
            >
                {currentHp} / {hpMax}
            </span>
        </Popover>
    );
}
