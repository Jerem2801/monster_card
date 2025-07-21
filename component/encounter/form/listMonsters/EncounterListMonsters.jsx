import { useState, useMemo } from 'react';
import MonsterCard from '../monsterCard/MonsterCard';
import EncounterFormFilter from './EncounterFormFilter'; // ← nouvel import

export default function EncounterListMonsters({ sortedMonsters, addMonster }) {
    const [filters, setFilters] = useState({
        showMinions: true,
        showNormals: true,
        showLegendary: true,
        selectedType: '',
    });

    const filteredMonsters = useMemo(() => {
        const { showMinions, showNormals, showLegendary, selectedType } = filters;
        return sortedMonsters.filter(monster => {
            const typeMatch = selectedType ? monster.type.id === selectedType : true;
            const isMinion = showMinions && monster.minion;
            const isLegendary = showLegendary && monster.legendary;
            const isNormal = showNormals && !monster.minion && !monster.legendary;

            return typeMatch && (isMinion || isLegendary || isNormal);
        });
    }, [sortedMonsters, filters]);

    return (
        <div className="w-full md:w-2/3">
            <EncounterFormFilter onFilterChange={setFilters} />

            <div className="flex flex-wrap gap-2 lg:gap-4">
                {filteredMonsters.map((monster, index) => (
                    <MonsterCard
                        key={index}
                        monster={monster}
                        add={() => addMonster(monster.id)}
                        selected={false}
                    />
                ))}
            </div>
        </div>
    );
}
