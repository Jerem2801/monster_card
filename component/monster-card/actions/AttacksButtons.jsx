import AttackButton from '@/component/monster-card/actions/AttackButton';

export default function AttackButtons({ monster }) {
    return (
        <div className="relative inline-block">
            {monster.action.map(action => (
                <AttackButton key={action.name} action={action} />
            ))}
        </div>
    );
}
