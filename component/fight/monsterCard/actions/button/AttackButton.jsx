import { Popover } from 'flowbite-react';
import ActionThrowModal from './ActionThrowModal';
import Image from 'next/image';
import { getDiceImagePath } from '../lib/actionUtils';

export default function AttackButton({ diceText, diceProperty, action, passive, monsterName,status }) {
    const baseClass =
        'text-md inline-flex items-center gap-1 cursor-pointer rounded px-1';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';

    const dicePath = getDiceImagePath(diceProperty);

    return (
        <Popover
            content={
                <ActionThrowModal
                    action={action}
                    monsterName={monsterName}
                    diceProperty={diceProperty}
                    status={status}
                />
            }
            placement="top"
        >
            <button
                className={`${baseClass} ${passive ? passiveClass : activeClass}`}
                type="button"
            >
                {diceText} <Image src={dicePath} alt={dicePath} width={20} height={20} />
            </button>
        </Popover>
    );
}
