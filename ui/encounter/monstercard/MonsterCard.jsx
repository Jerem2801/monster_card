import NamePanel from '@/ui/encounter/monstercard/NamePanel';

export default function MonsterCard({ monster, add, remove, selected }) {
    return (
        <div
            className={`p-4 space-y-3  shadow-md 
			${selected ? 'w-full' : 'w-[49%]'}
			${monster.legendary ? 'border border-yellow-400 bg-amber-100' : 'border border-neutral-200'}
			rounded-md
		`}
        >
            <NamePanel {...{ monster, add, remove, selected }} />
        </div>
    );
}
