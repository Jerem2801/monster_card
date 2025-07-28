import { useState } from 'react';

import { useEncounterState } from './hook/useEncounterState';
import { useMonsterState } from './hook/useMonsterState';

import { dataMonsters } from '@/data/monsterdata';
import { loadEncounter } from '@/component/encounter/form/lib/EncounterFormQuery';

import MonsterList from './ui/MonsterList';
import MonsterDetail from './ui/MonsterDetail';
import ResultPanel from './ui/ResultPanel';
import { MessagesProvider } from '@/component/fight/ui/resultDisplay/MessagesProvider';

export default function Fight({ encounterId }) {
    const encounter = useEncounterState(encounterId, loadEncounter, dataMonsters);
    const monster = useMonsterState(encounter.monsters, encounter.setMonsters);

    const [deleteMode, setDeleteMode] = useState(false);

    return (
        <MessagesProvider>
            <div className="relative flex h-[calc(100vh-5rem)] overflow-hidden">
                <MonsterList
                    encounterName={encounter.encounterName}
                    monsters={encounter.monsters}
                    modifiedMonsters={monster.modifiedMonsters}
                    selectedMonsterId={encounter.selectedMonsterId}
                    setSelectedMonsterId={encounter.setSelectedMonsterId}
                    deleteMode={deleteMode}
                    setDeleteMode={setDeleteMode}
                    deleteMonster={monster.deleteMonster}
                    updateMonsterHp={monster.updateMonsterHp}
                    updateMonsterHpLegendary={monster.updateMonsterHpLegendary}
                    updateMonster={monster.updateMonster}
                    updateMonsterStatus={monster.updateMonsterStatus}
                />

                <MonsterDetail
                    selectedMonster={encounter.selectedMonster}
                    modifiedMonsters={monster.modifiedMonsters}
                    addMonsterCard={monster.addMonsterCard}
                    updateMonster={monster.updateMonster}
                    updateMonsterStatus={monster.updateMonsterStatus}
                />

                <ResultPanel />
            </div>
        </MessagesProvider>
    );
}
