import { getActionContent } from '@/ui/monsterCard/actions/actionUtils';

export default function Passive({ passive }) {
    const content = getActionContent(passive, true);

    return (
        <div className="text-sm">
            <span className="font-bold">{passive.name} </span>
            {content}
        </div>
    );
}
