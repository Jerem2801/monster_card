import { useState, useEffect } from 'react';
import { ToggleSwitch, Dropdown, DropdownItem } from 'flowbite-react';
import { MONSTER_TYPE } from '@/data/monsterdata';

export default function EncounterFormFilter({ onFilterChange }) {
    const [showMinions, setShowMinions] = useState(true);
    const [showNormals, setShowNormals] = useState(true);
    const [showLegendary, setShowLegendary] = useState(true);
    const [selectedType, setSelectedType] = useState('');

    const typeOptions = Object.values(MONSTER_TYPE);
    const selectedTypeLabel = selectedType
        ? typeOptions.find(type => type.id === selectedType)?.label || 'Type inconnu'
        : 'Tous les types';

    // Communique les filtres au parent à chaque changement
    useEffect(() => {
        onFilterChange({ showMinions, showNormals, showLegendary, selectedType });
    }, [showMinions, showNormals, showLegendary, selectedType]);

    return (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
            <Dropdown className="max-w-xs flex-grow" label={selectedTypeLabel}>
                <DropdownItem onClick={() => setSelectedType('')}>Tous les types</DropdownItem>
                {typeOptions.map(type => (
                    <DropdownItem key={type.id} onClick={() => setSelectedType(type.id)}>
                        {type.label}
                    </DropdownItem>
                ))}
            </Dropdown>

            <ToggleSwitch checked={showMinions} label="Minions" onChange={setShowMinions} />
            <ToggleSwitch checked={showNormals} label="Normaux" onChange={setShowNormals} />
            <ToggleSwitch checked={showLegendary} label="Légendaires" onChange={setShowLegendary} />
        </div>
    );
}
