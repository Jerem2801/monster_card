import { DEADLY, BLOODIED, DEAD, STATUSES } from '@/data/statusdata';

export default function ListStatus({ selectedStatuses, removeStatus, setSelectedStatuses }) {
    return (
        <div className="relative">
            {selectedStatuses.length != 0 && (
                <div className="flex flex-col space-y-2">
                    {selectedStatuses.map(id => {
                        let status = STATUSES.find(s => s.id === id);
                        if (BLOODIED.id === id) {
                            status = BLOODIED;
                        } else if (DEAD.id === id) {
                            status = DEAD;
                        } else if (DEADLY.id === id) {
                            status = DEADLY;
                        }
                        if (!status) return null;
                        return (
                            <div key={id} className="flex items-start gap-3">
                                <button
                                    onClick={() => removeStatus(id, setSelectedStatuses)}
                                    className="flex w-full cursor-pointer items-start gap-3 text-left"
                                >
                                    {/* Emoji dans une zone fixe */}
                                    <span className="flex w-8 items-center justify-center text-2xl select-none">
                                        {status.emoji}
                                    </span>

                                    {/* Texte label + description */}
                                    <div>
                                        <span className="font-semibold text-gray-800">
                                            {status.label}.
                                        </span>
                                        <span className="ml-1 text-xs text-gray-600">
                                            {status.description}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
