import { useState } from 'react';

import MonsterCard from '../monsterCard/MonsterCard';
import EncounterDifficulty from './EncounterDifficulty';

export default function EncounterSelectedMonsters({
    selectedMonsters,
    nbHeroes,
    levelHeroes,
    removeMonster,
}) {
    const [fadingIndexes, setFadingIndexes] = useState([]);

    const handleRemove = index => {
        setFadingIndexes(prev => [...prev, index]);
        setTimeout(() => {
            setFadingIndexes(prev => prev.filter(i => i !== index));
            removeMonster(index);
        }, 300);
    };

    return (
        <div className="w-full md:w-1/3 flex flex-col ">
            <h2 className="mb-1 text-lg font-semibold">Monstres Sélectionnés</h2>

            <EncounterDifficulty
                selectedMonsters={selectedMonsters}
                nbHeroes={nbHeroes}
                levelHeroes={levelHeroes}
            />

            {selectedMonsters.length === 0 ? (
                <div className="flex h-24 items-center justify-center text-gray-400 italic ">
                    Aucun monstre sélectionné.
                </div>
            ) : (
                <div className="flex flex-col gap-4 overflow-y-auto">
                    {selectedMonsters.map((monster, index) => (
                        <div
                            key={index}
                            className={`relative w-full ${fadingIndexes.includes(index) ? 'animate-fadeout' : 'animate-fadein'}`}
                        >
                            <MonsterCard
                                monster={monster}
                                remove={() => handleRemove(index)}
                                selected={true}
                                className="w-full"
                            />
                        </div>
                    ))}
                </div>
            )}
            <style jsx>{`
                @keyframes fadein {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                @keyframes fadeout {
                    from {
                        opacity: 1;
                        transform: scale(1);
                    }
                    to {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                }
                .animate-fadein {
                    animation: fadein 0.3s;
                }
                .animate-fadeout {
                    animation: fadeout 0.1s forwards;
                }
            `}</style>
        </div>
    );
}
