import Actions from '@/component/monster-card/actions/Actions';

export default function ActionPanel({ monster }) {
    return (
        <div className="relative inline-block">
            {monster.action.map(action => (
                <Actions key={action.name} action={action} />
            ))}
        </div>
    );
}
