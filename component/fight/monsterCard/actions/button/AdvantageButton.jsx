import Image from 'next/image';

export default function AdvantageButton({ advantageNumber, passive }) {
    const baseClass =
        'text-md inline-flex items-center gap-1 rounded px-1 align-middle select-none';
    const passiveClass = 'bg-gray-100 hover:bg-gray-200';
    const activeClass = 'bg-gray-200 hover:bg-gray-300';

    const isAdvantage = advantageNumber > 0;
    const absoluteAdvantage = Math.abs(advantageNumber);

    return (
        <span className={`${baseClass} ${passive ? passiveClass : activeClass}`}>
            {absoluteAdvantage}
            {isAdvantage ? (
                <>
                    <span>Avantage </span>
                    <Image src="/dice/advantage.png" alt="advantage" width={20} height={20} />
                </>
            ) : (
                <>
                    <span>Désavantage </span>
                    <Image src="/dice/disadvantage.png" alt="advantage" width={20} height={20} />
                </>
            )}
        </span>
    );
}
