export default function LegendaryMechanics({monster}){

    const formatDescription = (text, hp) => {
        const parts = text.split('$hp');
        return parts.reduce((acc, part, index) => {
            acc.push(<span key={`text-${index}`}>{part}</span>);
            if (index < parts.length - 1) {
                acc.push(
                    <span key={`hp-${index}`} className="font-bold text-lg text-red-700">
                        {hp}
                    </span>
                );
            }
            return acc;
        }, []);
    };

    return (
        <div className="border-t-2 border-gray-300 pt-4 mt-4">
            <p>
                <span className="font-bold text-xl">ENSANGLANTÉ: </span>{formatDescription(monster.bloodied.description, monster.bloodied.hp)}
            </p>
            <p>
                <span className="font-bold text-xl">DERNIÈRE CHANCE: </span>{formatDescription(monster.lastStand.description, monster.lastStand.hp)}
            </p>
        </div>
    );
}