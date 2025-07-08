import MonsterCard from '@/ui/monstercard/MonsterCard'

export default function EncounterListMonsters({sortedMonsters, addMonster}){
    return (
        
            <div className="w-full md:w-2/3">
                <div className="flex flex-wrap gap-4">
                    {sortedMonsters.map((monster, index) => (
                        <MonsterCard
                            key={index}
                            monster={monster}
                            add={() => addMonster(monster.name)}
                            selected={false}
                        />
                    ))}
                </div>
            </div>
        
    );
}