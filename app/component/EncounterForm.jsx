'use client';

import { dataMonsters } from '@/app/data/monsterdata-test';
import MonsterCard from "@/app/ui/monstercard/MonsterCard";
import SimpleButton from '@/app/ui/SimpleButton';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { parseLevel, getTotalMonsterLevel, computeDifficultyLabel } from '@/app/lib/monsterUtils';
import { checkExisting } from '@/app/lib/db/encounter';


export default function EncounterForm({ encounterId }) {
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [nbHeroes, setNbHeroes] = useState(1);
  const [levelHeroes, setLevelHeroes] = useState(1);
  const [encounterName, setEncounterName] = useState('');

  const router = useRouter();

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
    if (!encounterName) { 
      alert("Veuillez donner un nom à la rencontre");
      return;
    }
    if (selectedMonsters.length === 0) {
      alert("Veuillez ajouter au moins un monstre à la rencontre");
      return;
    }
    const prout = await checkExisting(encounterId, encounterName);
    
    if(prout){
      alert("Une rencontre avec ce nom existe déjà");
      return;
    }

    try {
      const encounterDetails = selectedMonsters.reduce((acc, monster) => {
        const existing = acc.find(item => item.nom_monstre === monster.name);
        if (existing) {
          existing.nombre_monstre += 1; // Incrémente le nombre si déjà présent
        } else {
          acc.push({ nom_monstre: monster.name, nombre_monstre: 1 });
        }
        return acc;
      }
      , []);
      const response = await fetch('/api/encounter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          encounterId: encounterId || null, 
          name: encounterName,
          encounter: encounterDetails
        }),
      });
      if (!response.ok) {
        const errorData = await response.json(); // 👈 on récupère { error: ... }
        console.log(errorData.error)
        throw new Error(errorData.error || "Erreur lors de l'enregistrement de la rencontre");
      }
      
      const data = await response.json();
      console.log("Rencontre enregistrée :", data);
      router.push('/encounter');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la rencontre :", error);
      alert("Une erreur est survenue lors de l'enregistrement de la rencontre. Veuillez réessayer.");
    }
  };

  const sortedMonsters = [...dataMonsters].sort((a, b) => parseLevel(a.level) - parseLevel(b.level));

  // Charge les données si encounterId existe
  useEffect(() => {
    if (!encounterId) {
      setSelectedMonsters([]);
      setEncounterName('');
      return;
    }

    async function fetchEncounter() {
      try {
        const res = await fetch(`/api/encounter/${encounterId}`);
        if (!res.ok) throw new Error("Erreur chargement rencontre");
        const datas = await res.json();
        console.log(datas);

        setEncounterName(datas.name || '');

        // Construire selectedMonsters à partir de details
        const monstersLoaded = [];
        datas.encounter.forEach(data => {
          const baseMonster = dataMonsters.find(m => m.name === data.nom_monstre);
          if (baseMonster) {
            for (let i = 0; i < data.nombre_monstre; i++) {
              monstersLoaded.push(baseMonster);
            }
          }
        });
        setSelectedMonsters(monstersLoaded);

      } catch (error) {
        console.error(error);
      }
    }
    fetchEncounter();
  }, [encounterId]);

  

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gray-100 rounded-2xl hover:bg-gray-200 shadow-md p-4 flex gap-4 items-end">
          <div>
            <label htmlFor="encounterName" className="block text-sm">Rencontre</label>
            <input
              type="text"
              id="encounterName"
              placeholder="Nom de la Rencontre"
              className="focus:outline-none"
              value={encounterName}
              onChange={e => setEncounterName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nbHeroes" className="block text-sm">Nombre de héros</label>
            <input
              type="number"
              id="nbHeroes"
              min={1}
              value={nbHeroes}
              onChange={e => setNbHeroes(Number(e.target.value))}
              className="focus:outline-none w-16 text-center"
            />
          </div>
          <div>
            <label htmlFor="levelHeroes" className="block text-sm">Niveau des héros</label>
            <input
              type="number"
              id="levelHeroes"
              min={1}
              value={levelHeroes}
              onChange={e => setLevelHeroes(Number(e.target.value))}
              className="focus:outline-none w-16 text-center"
            />
          </div>
        </div>
        <SimpleButton name="Enregistrer" onClick={saveEncounter}/>
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
            <div>Niveau cumulé : <span className="font-bold">{getTotalMonsterLevel(selectedMonsters,nbHeroes)}</span></div>
            <div>
              Niveau des héros : <span className="font-bold">{levelHeroes*nbHeroes}</span>   
            </div>
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
