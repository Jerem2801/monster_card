import { getActionContent } from '../actions/lib/actionUtils';

export default function Passive({ passive, addMonsterCard, monsterName }) {
    const content = getActionContent(passive, true, addMonsterCard, monsterName,false);

    return (
        <div className="w-[112%] -ml-[6%] rounded-sm shadow-sm mb-2 p-2 px-10 italic bg-gray-300 py-1 text-sm">
            <span className="font-bold">{passive.name} </span>
            {content}
        </div>
    );
}
