import { dataMonsters } from '@/data/monsterdata';

export default function SummonButton({ action, passive, addMonsterCard }) {
    const baseClass = 'text-md not-italic inline-block cursor-pointer rounded px-1 align-middle';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';

    function addMonster(action) {
        const monsterName = action.summon.name;
        const baseMonster = dataMonsters.find(m => m.name === monsterName);
        addMonsterCard(baseMonster);
    }

    return (
        <button
            className={`${baseClass} ${passive ? passiveClass : activeClass}`}
            type="button"
            onClick={() => addMonster(action)}
        >
            {action.summon.name}
        </button>
    );
}
