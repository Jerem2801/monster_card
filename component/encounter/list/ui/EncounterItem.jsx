import EncouterItemPanel from './EncounterItemPanel';

export default function EncounterItem({ encounter, handleDelete }) {
    return (
        <div className="flex flex-col gap-2 rounded-lg bg-gray-200 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:gap-0">
            <div className="text-center text-lg font-bold select-none sm:text-left sm:text-xl">
                {encounter.name}
            </div>

            <EncouterItemPanel encounterId={encounter.id} handleDelete={handleDelete} />
        </div>
    );
}
