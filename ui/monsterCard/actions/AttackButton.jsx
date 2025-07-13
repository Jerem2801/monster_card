import { Popover } from 'flowbite-react';
import ActionThrowModal from './ActionThrowModal';

export default function AttackButton({diceText,action}){
    return (
        <>
         <Popover
            content={       
                <ActionThrowModal
                    action={action}
                />
            }
            placement="top"
        >
            <button
                className="text-md not-italic inline-block cursor-pointer rounded bg-gray-100 px-1 align-middle hover:bg-gray-200"
                type="button"
            >
                {diceText} 🎲
            </button>
        </Popover>
        </>
    )
}