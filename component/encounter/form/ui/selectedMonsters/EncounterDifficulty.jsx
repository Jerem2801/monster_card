import { getTotalMonsterLevel, computeDifficultyLabel } from '../../lib/EncounterFormUtils';

export default function EncounterDifficulty({ selectedMonsters, nbHeroes, levelHeroes }) {
    return (
        <div className="mb-4 rounded-lg bg-gray-100 p-3 text-sm shadow-md">
            <div>
                Nombre de monstres : <span className="font-bold">{selectedMonsters.length}</span>
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
    );
}
