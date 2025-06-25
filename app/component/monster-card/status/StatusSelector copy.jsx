import { STATUSES } from "../../../data/statusdata"

export default function StatusSelector({handleStatusModal,selectedStatuses,toggleStatus}){
      const statusOrder = STATUSES.slice().sort((a, b) => a.label.localeCompare(b.label));

    return (<div className="fixed inset-0 bg-black/30 backdrop-blur-3xl flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Choisir les statuts
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {statusOrder.map((status) => (
                <label
                  key={status.id}
                  className="flex items-center gap-2 cursor-pointer"
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

            <div className="flex justify-end gap-2 pt-2">
              <button
                className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
                onClick={handleStatusModal}
              >
                Annuler
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={handleStatusModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>);
}