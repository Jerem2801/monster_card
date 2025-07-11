import { useState } from 'react';
import { DropdownItem, ToggleSwitch } from 'flowbite-react';
import { Dropdown } from 'flowbite-react';

import MonsterCard from '@/ui/encounter/monstercard/MonsterCard';
import { MONSTER_TYPE } from '@/data/monsterdata';

export default function EncounterListMonsters({ sortedMonsters, addMonster }) {
    const [showMinions, setShowMinions] = useState(true);
    const [showNormals, setShowNormals] = useState(true);
    const [showLegendary, setShowLegendary] = useState(true);
    const [selectedType, setSelectedType] = useState('');

    // Build type options from MONSTER_TYPE
    const typeOptions = Object.values(MONSTER_TYPE);

    // Filter by type if selected
    const filteredMonsters = sortedMonsters.filter(monster => {
        const typeMatch = selectedType ? monster.type.id === selectedType : true;
        return (
            typeMatch &&
            ((showMinions && monster.minion) ||
                (showLegendary && monster.legendary) ||
                (showNormals && !monster.minion && !monster.legendary))
        );
    });

    // Get label for selected type
    const selectedTypeLabel = selectedType
        ? typeOptions.find(type => type.id === selectedType)?.label || 'Type inconnu'
        : 'Tous les types';

    return (
        <div className="w-full md:w-2/3">
            <div className="mb-4 flex flex-wrap items-center gap-4">
                <ToggleSwitch checked={showMinions} label="Minions" onChange={setShowMinions} />
                <ToggleSwitch checked={showNormals} label="Normaux" onChange={setShowNormals} />
                <ToggleSwitch
                    checked={showLegendary}
                    label="Légendaires"
                    onChange={setShowLegendary}
                />
                <Dropdown className="ml-12 max-w-xs flex-grow" label={selectedTypeLabel}>
                    <DropdownItem onClick={() => setSelectedType('')}>Tous les types</DropdownItem>
                    {typeOptions.map(type => (
                        <DropdownItem key={type.id} onClick={() => setSelectedType(type.id)}>
                            {type.label}
                        </DropdownItem>
                    ))}
                </Dropdown>
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
