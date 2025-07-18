export function getHealthBarProps(currentHp, maxHp) {
    const ratio = currentHp / maxHp;
    const clampedRatio = Math.max(0, Math.min(1, ratio));

    const barColor =
        clampedRatio > 0.66 ? 'bg-green-500' : clampedRatio > 0.33 ? 'bg-yellow-400' : 'bg-red-500';

    const barWidth = `${clampedRatio * 100}%`;

    return { barColor, barWidth };
}
