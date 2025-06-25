import { STATUSES } from "../../../data/statusdata"

export default function StatusSelector({selectedStatuses,toggleStatus}){
      const statusOrder = STATUSES.slice().sort((a, b) => a.label.localeCompare(b.label));

    return (<div className="border-t pt-3 text-center">
      <label className="block text-sm text-gray-600 mb-2">Status</label>

              <div className="grid grid-cols-2 gap-3">
                {statusOrder.map((status) => (
                  <label
                    key={status.id}
                    className="flex items-center gap-2 cursor-pointer pl-5"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status.id)}
                      onChange={() => toggleStatus(status.id)}
                    />
                    <span className="text-xl">{status.emoji}</span>
                    <span className="text-sm text-gray-700">{status.label}</span>
                  </label>
                ))}
              </div>
          </div>);
}