import EncounterItem from './EncounterItem'

export default function EncounterList({ encounters, handleDelete }) {
    if (encounters.length === 0) {
        return <p className="text-gray-500">Aucune rencontre trouvée.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {encounters.map(encounter => (
                <EncounterItem
                    key={encounter.id}
                    encounter={encounter}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
}
