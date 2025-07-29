import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import ReadOnlyNumber from '@/ui/simple/ReadOnlyNumber';

export default function FightHeader({ encounterName, deleteMode, setDeleteMode, heroes }) {

    return (
        <div className="flex items-center justify-between bg-white px-5 py-3">
            <div className="flex items-center gap-3">
                ⚔️
                <h1 className="text-xl font-bold tracking-tight text-gray-800">{encounterName}</h1>
            </div>

            <button
                onClick={() => setDeleteMode(!deleteMode)}
                className={`flex items-center gap-1 rounded-md px-3 py-1.5 text-sm font-medium shadow-sm transition duration-200 ${
                    deleteMode
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
                <span className="text-base">{deleteMode ? '✖' : '🗑️'}</span>
                {deleteMode ? 'Quitter Suppression' : 'Mode Suppression'}
            </button>

             <SimpleInputNumber
                label="Nombre de héros"
                min={1}
                max={10}
                value={heroes.heroSettings.nbHeroes}
                onChange={e => updateHeroSettings('nbHeroes', Number(e.target.value))}
            />

            <SimpleInputNumber
                label="Niveau des héros"
                min={1}
                max={20}
                value={heroes.heroSettings.levelHeroes}
                onChange={e => updateHeroSettings('levelHeroes', Number(e.target.value))}
            />

            <ReadOnlyNumber label="Niveau Total" value={heroes.heroSettings.nbHeroes * heroes.heroSettings.levelHeroes} />
        </div>
    );
}
