import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import ReadOnlyNumber from '@/ui/simple/ReadOnlyNumber';

import { getTotalMonsterLevelInCombat, computeDifficultyLabelInCombat } from '@/component/encounter/form/lib/EncounterFormUtils';

export default function FightHeader({ encounterName, deleteMode, setDeleteMode, heroes, monsters }) {
    return (
        <div className="relative flex items-center justify-between bg-white border-b-2 border-gray-300 px-6 py-4">
            {/* Gauche : Bouton suppression */}
            <div className="flex items-center">
                <button
                    onClick={() => setDeleteMode(!deleteMode)}
                    className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition duration-200 ${
                        deleteMode
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    <span className="text-base">{deleteMode ? '✖' : '🗑️'}</span>
                    {deleteMode ? 'Quitter Suppression' : 'Mode Suppression'}
                </button>
            </div>

            {/* Centre : Titre (absolu centré) */}
            <div className="absolute left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                    ⚔️
                    <h1>{encounterName}</h1>
                </div>
            </div>

            {/* Droite : Paramètres héros */}
            <div className="flex items-center gap-4">
                <SimpleInputNumber
                    label="Nombre de héros"
                    min={1}
                    max={10}
                    value={heroes.heroSettings.nbHeroes}
                    onChange={e =>
                        heroes.updateHeroSettings('nbHeroes', Number(e.target.value))
                    }
                />

                <SimpleInputNumber
                    label="Niveau des héros"
                    min={1}
                    max={20}
                    value={heroes.heroSettings.levelHeroes}
                    onChange={e =>
                        heroes.updateHeroSettings('levelHeroes', Number(e.target.value))
                    }
                />

                {(() => {
                    const { label, color } = computeDifficultyLabelInCombat({
                        nbHeroes: heroes.heroSettings.nbHeroes,
                        levelHeroes: heroes.heroSettings.levelHeroes,
                        selectedMonsters: monsters,
                    });
                    return (
                            <ReadOnlyNumber label="Difficulté" value={label} className={color} />
                        );
                    })()}

                

            </div>
        </div>
    );
}
