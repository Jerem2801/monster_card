import StatusButton from '@/component/fight/ui/monsterCard/actions/button/StatusButton';

export function getLegendaryContent(content, status, allChecked) {
    const parts = content.description.split(/(\$[^$]+\$)/g); // découpe tous les tokens

    return (
        <>
            {parts.map((part, index) => {
                const tokenMatch = part.match(/^\$(.+)\$$/); // is a token
                if (!tokenMatch) {
                    return <span key={`text-${index}`}>{part}</span>;
                }

                const parsed = parseLegendaryToken(tokenMatch[1]);
                if (!parsed) {
                    return (
                        <span key={`invalid-${index}`} className="text-red-600 italic">
                            [token invalide]
                        </span>
                    );
                }

                switch (parsed.type) {
                    case 'hp':
                        return (
                            <span
                                key={`hp-${index}`}
                                className="text-lg font-extrabold text-red-800"
                            >
                                {content.hp}
                            </span>
                        );
                    case 'status':
                        return (
                            <StatusButton
                                key={`status-${index}`}
                                statusName={parsed.name}
                                passive={false}
                                allChecked={allChecked}
                            />
                        );
                    default:
                        return <span key={`text-${index}`}>{part}</span>;
                }
            })}
        </>
    );
}

export function parseLegendaryToken(token) {
    if (token === 'hp') {
        return { type: 'hp' };
    }

    const statusMatch = token.match(/^status:(\w+)$/);
    if (statusMatch) {
        return { type: 'status', name: statusMatch[1] };
    }

    return null;
}
