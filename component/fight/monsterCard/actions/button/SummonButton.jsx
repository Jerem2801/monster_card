import { dataMonsters } from '@/data/monsterdata';

export default function SummonButton({ summonName, quantity, perHero, passive, addMonsterCard }) {
    const baseClass = 'text-md inline-block cursor-pointer rounded px-1';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';

    const summonMonster = dataMonsters.find(m => m.id === summonName);

    return (
        <button
            className={`${baseClass} ${passive ? passiveClass : activeClass}`}
            type="button"
            onClick={() => addMonsterCard(summonMonster, quantity)}
        >
            {summonMonster.name}
        </button>
    );
}
