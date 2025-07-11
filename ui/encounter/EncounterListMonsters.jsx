import { useState } from 'react';
import { ToggleSwitch } from 'flowbite-react';
import MonsterCard from '@/ui/encounter/monstercard/MonsterCard';

export default function EncounterListMonsters({ sortedMonsters, addMonster }) {
    const [showMinions, setShowMinions] = useState(true);
    const [showNormals, setShowNormals] = useState(true);
    const [showLegendary, setShowLegendary] = useState(true);

    const filteredMonsters = sortedMonsters.filter(monster => {
        return (
            (showMinions && monster.minion) ||
            (showLegendary && monster.legendary) ||
            (showNormals && !monster.minion && !monster.legendary)
        );
    });

    return (
        <div className="w-full md:w-2/3">
            <div className="flex flex-wrap gap-4 mb-4">
                <ToggleSwitch checked={showMinions} label="Minions" onChange={setShowMinions} />
                <ToggleSwitch checked={showNormals} label="Normaux" onChange={setShowNormals} />
                <ToggleSwitch
                    checked={showLegendary}
                    label="Légendaires"
                    onChange={setShowLegendary}
                />
            </div>

            <div className="flex flex-wrap gap-2 lg:gap-4">
                {filteredMonsters.map((monster, index) => (
                    <MonsterCard
                        key={index}
                        monster={monster}
                        add={() => addMonster(monster.name)}
                        selected={false}
                    />
                ))}
            </div>
        </div>
    );
}
