import { Popover } from 'flowbite-react';
import ActionThrowModal from './ActionThrowModal';
import Image from 'next/image';
import { getDiceImagePath } from '../lib/actionUtils';

export default function AttackButton({ diceText, action, passive, monsterName }) {
    const baseClass =
        'text-md not-italic inline-flex items-center gap-1 cursor-pointer rounded px-1 align-middle';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';

    const dicePath = getDiceImagePath(action);

    return (
        <Popover
            content={<ActionThrowModal action={action} monsterName={monsterName} />}
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
