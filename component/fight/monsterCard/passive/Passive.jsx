import { getActionContent } from '../actions/lib/actionUtils';

export default function Passive({ passive }) {
    const content = getActionContent(passive, true);

    return (
        <div className="py-0.5 text-sm">
            <span className="font-bold">{passive.name} </span>
            {content}
        </div>
    );
}
