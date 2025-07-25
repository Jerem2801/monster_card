import CheckUsage from './CheckUsage';

import { getActionContent } from './lib/actionUtils';
import { useActionUses } from './hook/useActionUses';

export default function Actions({ action, addMonsterCard, monsterName,status }) {
    const { useCount, checkedStates, allChecked, toggleCheckbox } = useActionUses(action);
    const content = getActionContent(action, false, addMonsterCard, monsterName,status,allChecked);

    return (
        <div
            className={`rounded-md px-2 text-left ${
                allChecked ? 'text-gray-500 line-through' : ''
            }`}
        >
            <span className="text-lg font-bold">{action.name}</span>
            {''}

            <span className="ml-1 text-base">{content}</span>

            <CheckUsage
                useCount={useCount}
                toggleCheckbox={toggleCheckbox}
                checkedStates={checkedStates}
            />
        </div>
    );
}
