import HealPanel from '@/component/fight/ui/simpleCard/health/HealthPanel';

export default function HealthLegendaryPanel({
    hpMax,
    currentHp,
    handleDamage,
    handleHeal,
    toShow,
}) {
    return (
        <>
            {toShow && (
                <HealPanel
                    currentHp={currentHp}
                    hpMax={hpMax}
                    handleDamage={handleDamage}
                    handleHeal={handleHeal}
                />
            )}
        </>
    );
}
