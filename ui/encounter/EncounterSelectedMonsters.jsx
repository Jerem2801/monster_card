import MonsterCard from '@/ui/encounter/monstercard/MonsterCard';
import { getTotalMonsterLevel, computeDifficultyLabel } from '@/lib/monsterUtils';

export default function EncounterSelectedMonsters({
    selectedMonsters,
    nbHeroes,
    levelHeroes,
    removeMonster,
}) {
    return (
        <div className="w-full md:w-1/3">
            <h2 className="mb-1 text-lg font-semibold">Monstres Sélectionnés</h2>
            <div className="mb-4 rounded-lg bg-gray-100 p-3 text-sm shadow-md">
                <div>
                    Nombre de monstres :{' '}
                    <span className="font-bold">{selectedMonsters.length}</span>
                </div>
                <div>
                    Niveau Total :{' '}
                    <span className="font-bold">
                        {getTotalMonsterLevel(selectedMonsters, nbHeroes)}
                    </span>
                </div>
                <div>
                    Difficulté :{' '}
                    {(() => {
                        const { label, color } = computeDifficultyLabel({
                            nbHeroes,
                            levelHeroes,
                            selectedMonsters,
                        });
                        return <span className={`font-bold ${color}`}>{label}</span>;
                    })()}
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                {selectedMonsters.map((monster, index) => (
                    <MonsterCard
                        key={index}
                        monster={monster}
                        remove={() => removeMonster(index)}
                        selected={true}
                    />
                ))}
            </div>
        </div>
    );
}
