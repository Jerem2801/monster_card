import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import SimpleInputText from '@/ui/simple/SimpleInputText';
import ReadOnlyNumber from '@/ui/simple/ReadOnlyNumber';
import SimpleButton from '@/ui/simple/SimpleButton';

export default function EncounterParams({
    encounterName,
    setEncounterName,
    nbHeroes,
    setNbHeroes,
    levelHeroes,
    setLevelHeroes,
    saveEncounter,
}) {
    return (
        <div className="flex flex-wrap items-end gap-6 mb-6">
            <SimpleInputText
                label="Nom de la Rencontre"
                value={encounterName}
                onChange={e => setEncounterName(e.target.value)}
            />

            <div>
                <SimpleButton label="Enregistrer" onClick={saveEncounter} />
            </div>

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

            <ReadOnlyNumber label="Niveau Total" value={nbHeroes * levelHeroes} />
        </div>
    );
}
