import StatPanel from '@/ui/encounter/monstercard/StatPanel'

export default function NamePanel({ monster, add, remove, selected }) {
    return (
        <div className="flex w-full flex-nowrap items-start gap-4">
            <div className="flex min-w-0 flex-1 flex-col justify-between">
                <span className="truncate text-lg font-semibold">{monster.name}</span>
                <span className="truncate text-sm text-gray-500">Niv. {monster.level}</span>
            </div>
           <StatPanel 
                selected={selected}
                monster={monster}
                add={add}
                remove={remove}
           />
        </div>
    );
}
