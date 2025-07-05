'use client'

import Link from "next/link";
import { dataMonsters } from '@/app/data/monsterdata-test';
import MonsterCard from "@/app/ui/monstercard/MonsterCard";
import {useState} from "react";

function parseLevel(levelStr){
  if (!levelStr) return Infinity;

  // Récupérer la partie avant la virgule
  const levelPart = levelStr.split(',')[0].trim();

  // Gérer les fractions
  if (levelPart.includes('/')) {
    const [numerator, denominator] = levelPart.split('/').map(Number);
    return numerator / denominator;
  }

  const parsed = parseFloat(levelPart);
  return isNaN(parsed) ? Infinity : parsed;
}



export default function Page() {
  const [selectedMonsters, setSelectedMonsters] = useState([]);
  const [nbHeroes, setNbHeroes] = useState(1);
  const [levelHeroes, setLevelHeroes] = useState(1);

  function addMonster(monsterName) {
  // Logique pour ajouter le monstre
    const monster = dataMonsters.find(m => m.name === monsterName);
    if (monster) {
      setSelectedMonsters([...selectedMonsters, monster]);
    }
  }

  function removeMonster(index) {
    // Logique pour supprimer le monstre 
    const newSelectedMonsters = [...selectedMonsters];
    newSelectedMonsters.splice(index, 1);
    setSelectedMonsters(newSelectedMonsters);
  }


  const sortedMonsters = [...dataMonsters].sort((a, b) => {
    return parseLevel(a.level) - parseLevel(b.level);
  });

  return (
    <div className="pt-4">
      {/* Ligne 1 : input + lien */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gray-100 rounded-2xl hover:bg-gray-200 p-4 flex gap-4 items-end">
          <div>
            <label htmlFor="encounterName" className="block text-sm">Rencontre</label>
            <input
              type="text"
              id="encounterName"
              placeholder="Nom de la Rencontre"
              className="focus:outline-none"
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
        <Link
          href="/encounter/create"
          className="text-blue-300 border-2 border-blue-300 px-6 py-3 rounded-2xl hover:bg-blue-100 transition-colors"
        >
          Création
        </Link>
      </div>

      <div className="flex flex-col md:flex-row w-full h-full gap-6">
        {/* Bloc 1 — 2/3 */}
        <div className="w-full md:w-2/3">
         <div className="flex flex-wrap gap-4">
            {sortedMonsters.map((monster, index) => (
                <MonsterCard key={index} monster={monster} add={() => addMonster(monster.name)} selected={false}/>
              ))}
              </div>
        </div>

        {/* Bloc 2 — 1/3 */}
        <div className="w-full md:w-1/3">
          <h2 className="text-lg font-semibold mb-1">Monstres Sélectionnés</h2>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border text-sm">
            <div>Nombre de monstres : <span className="font-bold">{selectedMonsters.length}</span></div>
            <div>Niveau cumulé : <span className="font-bold">{
              Math.round(
                selectedMonsters.reduce((acc, m) => acc + (parseLevel(m.level) || 0), 0) * 10
              ) / 10
            }</span></div>
            {/* Difficulté de la rencontre */}
            <div className="">
              Difficulté : {(() => {
                const totalHeroLevel = nbHeroes * levelHeroes;
                // Calcul du niveau cumulé en tenant compte des légendaires
                const monsterLevel = Math.round(
                  selectedMonsters.reduce((acc, m) => {
                    const baseLevel = parseLevel(m.level) || 0;
                    // Si le monstre est legendary, on multiplie son niveau par le nombre de héros
                    return acc + (m.legendary ? baseLevel * nbHeroes : baseLevel);
                  }, 0) * 10
                ) / 10;
                let diff = '-';
                let color = '';
                if (totalHeroLevel === 0 || monsterLevel === 0) {
                  diff = '-';
                  color = '';
                } else if (monsterLevel <= totalHeroLevel * 0.5) {
                  diff = 'Facile';
                  color = 'text-green-600';
                } else if (monsterLevel <= totalHeroLevel * 0.75) {
                  diff = 'Moyen';
                  color = 'text-yellow-500';
                } else if (monsterLevel <= totalHeroLevel) {
                  diff = 'Difficile';
                  color = 'text-red-600';
                } else if (monsterLevel <= totalHeroLevel * 1.25) {
                  diff = 'Mortel';
                  color = 'text-black';
                } else if (monsterLevel >= totalHeroLevel * 1.5) {
                  diff = '💀 Très Mortel';
                  color = 'text-black';
                } else {
                  diff = 'Mortel';
                  color = 'text-black';
                }
                return <span className={`font-bold ${color}`}>{diff}</span>;
              })()}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
          {selectedMonsters.map((monster, index) => (
                <MonsterCard key={index} monster={monster} remove={() => removeMonster(index)} selected={true} />
              ))}
          </div>
          {/* Affichage du nombre de monstres sélectionnés et du niveau cumulé */}
          
        </div>
      </div>
    </div>
  );
}
