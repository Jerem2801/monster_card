import { Popover } from 'flowbite-react';
import ActionThrowModal from './ActionThrowModal';

export default function AttackButton({ diceText, action, passive,monsterName }) {
    const baseClass = 'text-md not-italic inline-block cursor-pointer rounded px-1 align-middle';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';
    return (
        <Popover content={<ActionThrowModal action={action} monsterName={monsterName}/>} placement="top">
            <button
                className={`${baseClass} ${passive ? passiveClass : activeClass}`}
                type="button"
            >
                {diceText} 🎲
            </button>
        </Popover>
    );
}
