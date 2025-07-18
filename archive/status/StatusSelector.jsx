import { STATUSES } from '@/data/statusdata';

export default function StatusSelector({ selectedStatuses, toggleStatus, setSelectedStatuses }) {
    const statusOrder = STATUSES.slice().sort((a, b) => a.label.localeCompare(b.label));

    return (
        <div className="border-t pt-3 text-center">
            <label className="mb-2 block text-sm text-gray-600">Status</label>

            <div className="grid grid-cols-2 gap-3">
                {statusOrder.map(status => (
                    <label key={status.id} className="flex cursor-pointer items-center gap-2 pl-5">
                        <input
                            type="checkbox"
                            checked={selectedStatuses.includes(status.id)}
                            onChange={() => toggleStatus(status.id, setSelectedStatuses)}
                        />
                        <span className="text-xl">{status.emoji}</span>
                        <span className="text-sm text-gray-700">{status.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}
