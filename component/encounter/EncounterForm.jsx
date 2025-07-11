'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { dataMonsters } from '@/data/monsterdata';

import EncounterParams from "@/ui/encounter/EncounterParams";
import EncounterListMonsters from "@/ui/encounter/EncounterListMonsters";
import EncounterSelectedMonsters from "@/ui/encounter/EncounterSelectedMonsters";


import { parseLevel} from '@/lib/monsterUtils';
import { isGoodBeforeSaveEncounter,getMonsterToSave,saveOrUpdateEncounter,loadEncounter } from '@/lib/encounterUtils';


export default function EncounterForm({ encounterId }) {
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [nbHeroes, setNbHeroes] = useState(1);
  const [levelHeroes, setLevelHeroes] = useState(1);
  const [encounterName, setEncounterName] = useState('');

  const router = useRouter();
  const sortedMonsters = [...dataMonsters].sort((a, b) => parseLevel(a.level) - parseLevel(b.level));

  const addMonster = (monsterName) => {
    const monster = dataMonsters.find(m => m.name === monsterName);
    if (monster) {
      setSelectedMonsters([...selectedMonsters, monster]);
    }
  };

  const removeMonster = (index) => {
    const newSelected = [...selectedMonsters];
    newSelected.splice(index, 1);
    setSelectedMonsters(newSelected);
  };

  const saveEncounter = async () => {
    const encounterNameTrimmed = encounterName.trim();
    if(!(await isGoodBeforeSaveEncounter(encounterId, encounterNameTrimmed, selectedMonsters))){
      return;
    }

    try {
      const encounterDetails = getMonsterToSave(selectedMonsters);
      saveOrUpdateEncounter(encounterId,encounterNameTrimmed,encounterDetails);
      router.push('/encounter');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la rencontre :", error);
      alert("Une erreur est survenue lors de l'enregistrement de la rencontre. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    if (!encounterId) {
      return;
    }

    async function fetchEncounter() {
     loadEncounter(encounterId,dataMonsters)
      .then(({ encounterName, selectedMonsters }) => {
        setEncounterName(encounterName || '');
        setSelectedMonsters(selectedMonsters || []);
      })
    }
    fetchEncounter();
  }, [encounterId]);

  
  return (
    <div className="pt-8 pl-8 pr-8 lg:pl-80 lg:pr-80">

      <EncounterParams 
        encounterName={encounterName} 
        nbHeroes={nbHeroes}
        levelHeroes={levelHeroes}
        setEncounterName={setEncounterName}
        setNbHeroes={setNbHeroes}
        setLevelHeroes={setLevelHeroes}
        saveEncounter={saveEncounter}
      />

      <div className="flex flex-col md:flex-row w-full h-full gap-6">

        <EncounterListMonsters
          sortedMonsters={sortedMonsters}
          addMonster={addMonster}
        />

        <EncounterSelectedMonsters
          selectedMonsters={selectedMonsters}
          nbHeroes={nbHeroes}
          levelHeroes={levelHeroes}
          removeMonster={removeMonster}
        />

      </div>
    </div>
  );
}
