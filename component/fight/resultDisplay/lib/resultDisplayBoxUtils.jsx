export function getEffectToDisplay({ result, effect }) {
    if (!effect || !effect.trigger || !effect.status || result?.type !== effect.trigger.id) {
        return null;
    }

    return (
        <div className="mt-3 border-t pt-2 text-sm font-semibold text-green-600">
            Effet {effect.trigger.name} ! {effect.status.label}
        </div>
    );
}
