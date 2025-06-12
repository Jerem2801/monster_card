export default function NamePanel({ monster}) {
    return (<div>

            {monster.passif && monster.passif.length > 0 && (

                <div className="bg-gray-300 p-2 italic rounded-sm max-w-md">
                    {monster.passif.map(({ name, description }, index) => (
                        <p key={index} className="mb-1 text-sm">
                            <span className="font-bold">{name}</span> {description}
                        </p>
                    ))}
                </div>
                
            )}

    </div>
    );
}