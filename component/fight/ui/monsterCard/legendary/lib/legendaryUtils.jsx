export function getLegendaryContent(content) {
    const parts = content.description.split('$hp$');
    return (
        <span>
            {parts[0]}
            <span className="text-lg font-extrabold text-red-800">{content.hp}</span>
            {parts[1]}
        </span>
    );
}
