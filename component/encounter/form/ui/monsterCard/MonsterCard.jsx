import NamePanel from './NamePanel';

export default function MonsterCard({ monster, add, remove, selected }) {
    return (
        <div
            className={`space-y-3 p-4 shadow-xs ${selected ? 'w-full' : 'w-[49%]'} ${monster.legendary ? 'border border-yellow-400 bg-amber-100' : 'border border-neutral-200'} rounded-md`}
        >
            <NamePanel {...{ monster, add, remove, selected }} />
        </div>
    );
}
