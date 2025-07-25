import Image from 'next/image';

export default function AdvantageButton({ advantageNumber, passive, allChecked }) {
    const baseClass =
        'text-md inline-flex items-center gap-1 rounded px-1 select-none transition';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';
    const disabledClass = 'opacity-50 line-through cursor-not-allowed';

    const isAdvantage = advantageNumber > 0;
    const absoluteAdvantage = Math.abs(advantageNumber);

    const className = [
        baseClass,
        passive ? passiveClass : activeClass,
        allChecked ? disabledClass : ''
    ].join(' ');

    return (
        <span
            className={className}
            title={allChecked ? "Désactivé car tous les personnages sont cochés" : undefined}
        >
            {absoluteAdvantage}
            {isAdvantage ? (
                <>
                    <span>Avantage</span>
                    <Image src="/dice/advantage.png" alt="Avantage" width={20} height={20} />
                </>
            ) : (
                <>
                    <span>Désavantage</span>
                    <Image src="/dice/disadvantage.png" alt="Désavantage" width={20} height={20} />
                </>
            )}
        </span>
    );
}
