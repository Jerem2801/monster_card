import { Popover } from 'flowbite-react';
import ActionThrowModal from './ActionThrowModal';
import Image from 'next/image';
import { getDiceImagePath } from '../lib/actionUtils';

export default function AttackButton({
  diceText,
  diceProperty,
  action,
  passive,
  monsterName,
  status,
  allChecked,
}) {
  const baseClass =
    'text-md inline-flex items-center gap-1 cursor-pointer rounded px-1 transition';
  const passiveClass = 'bg-gray-100 hover:bg-gray-200';
  const activeClass = 'bg-gray-200 hover:bg-gray-300';
  const disabledClass = 'opacity-50 cursor-not-allowed line-through';

  const dicePath = getDiceImagePath(diceProperty);

  const buttonClass = [
    baseClass,
    passive ? passiveClass : activeClass,
    allChecked ? disabledClass : '',
  ].join(' ');

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
      trigger="click"
      disabled={allChecked} // désactive le popover aussi
    >
      <button className={buttonClass} type="button" disabled={allChecked}>
        {diceText}
        <Image src={dicePath} alt={dicePath} width={20} height={20} />
      </button>
    </Popover>
  );
}

