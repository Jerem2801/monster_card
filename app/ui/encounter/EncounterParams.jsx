import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import SimpleInputText from '@/ui/simple/SimpleInputText';
import ReadOnlyNumber from '@/ui/simple/ReadOnlyNumber';

export default function EncounterParams({encounterName,setEncounterName,nbHeroes,setNbHeroes,levelHeroes,setLevelHeroes,saveEncounter}){
    return (
        <div className="flex flex-wrap items-end gap-6 mb-6">

            <SimpleInputText
                label="Nom de la Rencontre"
                value={encounterName}
                onChange={e => setEncounterName(e.target.value)}
            />

            <SimpleInputNumber
                label="Nombre de héros"
                min={1}
                value={nbHeroes}
                onChange={e => setNbHeroes(Number(e.target.value))}
            />

            <SimpleInputNumber
                label="Niveau des héros"
                min={1}
                value={levelHeroes}
                onChange={e => setLevelHeroes(Number(e.target.value))}
            />

            <ReadOnlyNumber 
                label="Niveau Total" 
                value={nbHeroes * levelHeroes}
            />

            <div className="self-end">
                <button
                    onClick={saveEncounter}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Enregistrer
                </button>
            </div>  
            
        </div>
    );
}