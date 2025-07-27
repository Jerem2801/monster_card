import { dataMonsters } from '@/data/monsterdata';

export default function SummonButton({
    summonName,
    quantity,
    perHero,
    passive,
    addMonsterCard,
    allChecked,
}) {
    const baseClass = 'text-md inline-block rounded px-1 transition';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';
    const disabledClass = 'opacity-50 cursor-not-allowed line-through';

    const summonMonster = dataMonsters.find(m => m.id === summonName);

    const buttonClass = [
        baseClass,
        passive ? passiveClass : activeClass,
        allChecked ? disabledClass : '',
    ].join(' ');

    return (
        <button
            className={buttonClass}
            type="button"
            onClick={() => !allChecked && addMonsterCard(summonMonster, quantity)}
            disabled={allChecked}
            title={allChecked ? 'Désactivé car tous les personnages sont cochés' : undefined}
        >
            {summonMonster.name}
        </button>
    );
}
