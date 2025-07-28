import StatusButton from '../../monsterCard/actions/button/StatusButton';

export function getEffectToDisplay({ result, effect }) {
    if (!effect || !effect.trigger || (!effect.status && !effect.message) || !result?.type) {
        return null;
    }

    const triggerId = effect.trigger.id;
    const resultType = result.type;

    const shouldDisplay =
        (triggerId === 'miss' && resultType === 'failed') ||
        ((triggerId === 'hit' || triggerId === 'damage') &&
            (resultType === 'normal' || resultType === 'critic')) ||
        (triggerId === 'critic' && resultType === 'critic');

    if (!shouldDisplay) {
        return null;
    }
    console.log(effect.status);
    const content = effect.status?.label ? (
        <StatusButton statusName={effect.status.id} passive={false} />
    ) : (
        effect.message
    );

    return (
        <div className="mt-3 border-t pt-2 font-semibold text-green-600">
            {effect.trigger.name} {content}
        </div>
    );
}
