import SimpleInputNumber from '@/ui/simple/SimpleInputNumber';
import SimpleInputText from '@/ui/simple/SimpleInputText';
import ReadOnlyNumber from '@/ui/simple/ReadOnlyNumber';
import { Button } from 'flowbite-react';

export default function EncounterParams({
    encounterName,
    setEncounterName,
    nbHeroes,
    setNbHeroes,
    levelHeroes,
    setLevelHeroes,
    selectedMonsters,
    saveEncounter,
}) {
    const isDisabled =
        !encounterName || !Array.isArray(selectedMonsters) || selectedMonsters.length === 0;

    const handleSubmit = e => {
        e.preventDefault();
        if (!isDisabled) saveEncounter();
    };

    return (
        <form className="mb-6 flex flex-wrap items-end gap-6" onSubmit={handleSubmit}>
            <SimpleInputText
                label="Nom de la Rencontre"
                value={encounterName}
                onChange={e => setEncounterName(e.target.value)}
                placeholder="Ex: Embuscade dans la forêt"
                required
            />

            <Button
                type="submit"
                disabled={isDisabled}
                className="cursor-pointer shadow-sm transition-transform active:scale-95"
            >
                Enregistrer
            </Button>

            <SimpleInputNumber
                label="Nombre de héros"
                min={1}
                max={10}
                value={nbHeroes}
                onChange={e => setNbHeroes(Number(e.target.value))}
            />

            <SimpleInputNumber
                label="Niveau des héros"
                min={1}
                max={20}
                value={levelHeroes}
                onChange={e => setLevelHeroes(Number(e.target.value))}
            />

            <ReadOnlyNumber label="Niveau Total" value={nbHeroes * levelHeroes} />
        </form>
    );
}
