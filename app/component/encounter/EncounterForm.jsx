'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { dataMonsters } from '@/data/monsterdata';
import MonsterCard from "@/ui/monstercard/MonsterCard";
import FormBlock from "@/ui/FormBlock";
import { parseLevel, getTotalMonsterLevel, computeDifficultyLabel } from '@/lib/monsterUtils';
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
    if(!(await isGoodBeforeSaveEncounter(encounterId, encounterName, selectedMonsters))){
      return;
    }

    try {
      const encounterDetails = getMonsterToSave(selectedMonsters);
      saveOrUpdateEncounter(encounterId,encounterName,encounterDetails);
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
    <div className="pt-4">
      <div className="flex flex-wrap items-end gap-6 mb-6">
        <FormBlock
          id="encounterName"
          label="Nom de la rencontre"
          placeholder="Ex: Donjon de la mort"
          value={encounterName}
          onChange={e => setEncounterName(e.target.value)}
          grow
        />

        <FormBlock
          id="nbHeroes"
          label="Nombre de héros"
          type="number"
          min={1}
          value={nbHeroes}
          onChange={e => setNbHeroes(Number(e.target.value))}
        />

        <FormBlock
          id="levelHeroes"
          label="Niveau des héros"
          type="number"
          min={1}
          value={levelHeroes}
          onChange={e => setLevelHeroes(Number(e.target.value))}
        />

        <div className="w-36 bg-gray-100 rounded-2xl text-center shadow-inner p-4">
          <label className="block text-sm text-gray-700 mb-1">Niveau Total</label>
          <div className="w-full text-center focus:outline-nonefont-semibold">
            {nbHeroes * levelHeroes}
          </div>
        </div>
        <div className="self-center">
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={saveEncounter}
        >
          Enregistrer
        </button>
        </div>
        
      </div>


      <div className="flex flex-col md:flex-row w-full h-full gap-6">
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-4">
            {sortedMonsters.map((monster, index) => (
              <MonsterCard
                key={index}
                monster={monster}
                add={() => addMonster(monster.name)}
                selected={false}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-1">Monstres Sélectionnés</h2>
          <div className="mb-4 p-3 bg-gray-100 rounded-lg shadow-md text-sm">
            <div>Nombre de monstres : <span className="font-bold">{selectedMonsters.length}</span></div>
            <div>Niveau Total : <span className="font-bold">{getTotalMonsterLevel(selectedMonsters,nbHeroes)}</span></div>
            <div>
              Difficulté : {
                (() => {
                  const { label, color } = computeDifficultyLabel({ nbHeroes, levelHeroes, selectedMonsters });
                  return <span className={`font-bold ${color}`}>{label}</span>;
                })()
              }
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {selectedMonsters.map((monster, index) => (
              <MonsterCard
                key={index}
                monster={monster}
                remove={() => removeMonster(index)}
                selected={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
