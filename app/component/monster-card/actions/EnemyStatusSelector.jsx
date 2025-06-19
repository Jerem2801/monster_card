import React, { useState } from "react";
import { STATUSES } from "../../../data/statusdata"


export default function EnemyStatusSelector() {
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleStatus = (id) => {
    setSelectedStatuses((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    setShowModal(false);
  };

  const getEmoji = (id) => {
    const status = STATUSES.find((s) => s.id === id);
    return status?.emoji || "";
  };

  return (
    <div className="relative">
      {/* Bouton pour ouvrir le modal */}
    <button
      className="text-left text-sm p-3 bg-gray-100 rounded hover:bg-gray-200 transition w-[350px] max-w-full"
      onClick={() => setShowModal(true)}
      title="Statut général"
    >
      Status
    </button>


      {selectedStatuses.length != 0 && (
        <div className="flex flex-col space-y-2">
          {selectedStatuses.map((id) => {
            const status = STATUSES.find((s) => s.id === id);
            if (!status) return null;
            return (
              <div key={id} className="flex items-start gap-3">
                <span className="text-2xl">{status.emoji}</span>
                <div>
                  <p className="font-semibold text-gray-800">{status.label}</p>
                  <p className="text-xs text-gray-600">{status.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-3xl flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Choisir les statuts
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {STATUSES.map((status) => (
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
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                onClick={handleConfirm}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
