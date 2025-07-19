export function formatMonsterName(name) {
    if (!name) return null;

    return name.split(' ').map((word, index) => {
        const firstLetter = word.charAt(0);
        const rest = word.slice(1);
        const isUpperCase = firstLetter === firstLetter.toUpperCase();

        return (
            <span key={index} className="mr-1 inline-flex items-end align-baseline">
                {isUpperCase ? (
                    <>
                        <span className="text-2xl">{firstLetter}</span>
                        <span className="text-lg uppercase">{rest}</span>
                    </>
                ) : (
                    // Compense ici : ajoute du padding pour équilibrer la hauteur
                    <span className="text-lg uppercase">{word}</span>
                )}
            </span>
        );
    });
}
