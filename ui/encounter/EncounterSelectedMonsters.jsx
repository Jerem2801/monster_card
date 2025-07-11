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
            <h2 className="text-lg font-semibold mb-1">Monstres Sélectionnés</h2>
            <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-md text-sm">
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
