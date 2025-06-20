import { STATUSES } from "../../../data/statusdata"
import { BLOODIED } from "../../../data/statusdata"


export default function EnemyStatusSelector({selectedStatuses}) {

  return (
    <div className="relative">
      {selectedStatuses.length != 0 && (
        <div className="flex flex-col space-y-2">
          {selectedStatuses.map((id) => {
            let status = STATUSES.find((s) => s.id === id);
            if(BLOODIED.id === id){
              status = BLOODIED;
            }
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
    </div>
  );
}
