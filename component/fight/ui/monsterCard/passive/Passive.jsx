import { getActionContent } from '../actions/lib/actionUtils';

export default function Passive({ passive, addMonsterCard, monsterName }) {
    const content = getActionContent(passive, true, addMonsterCard, monsterName, null, false);

    return (
        <div className="mb-2 -ml-[6%] w-[112%] rounded-sm bg-gray-300 p-2 px-10 py-1 text-sm italic shadow-sm">
            <span className="font-bold">{passive.name} </span>
            {content}
        </div>
    );
}
