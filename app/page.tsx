'use client'

import MonsterCard from './component/monstercard';
import { gobelin } from './data/monsterdata';
import { dataMonsters } from './data/monsterdata';
import { useState } from 'react';

export default function Home() {

  const [monsters, setMonsters] = useState([]);
  const [selectedMonsterName, setSelectedMonsterName] = useState(dataMonsters[0]?.name || '');

  function add(){
    const selected = dataMonsters.find((m) => m.name === selectedMonsterName);
    if (!selected) return;

    const id = crypto.randomUUID();
    setMonsters([...monsters, { id, monster: selected }]);
  }

  function remove(idToRemove){
    setMonsters(monsters.filter(monster => monster.id !== idToRemove)); 
  }


  return (
    <div className="p-4 space-y-4">
      <div className="p-6 bg-white rounded-lg shadow-md flex items-center space-x-4 inline-flex">
        <label htmlFor="monster-select" className="text-gray-700 font-semibold whitespace-nowrap">
          Séléctionner le Monstre:
        </label>
        <select
          id="monster-select"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 min-w-[10rem]"
          value={selectedMonsterName}
          onChange={(e) => setSelectedMonsterName(e.target.value)}
        >
          {dataMonsters.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button
          className="bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold rounded-md px-5 py-2 whitespace-nowrap"
          onClick={add}
        >
          Ajouter le Monstre
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {monsters.map(({ id, monster }) => (
          <MonsterCard key={id} monster={monster} remove={() => remove(id)}/>
        ))}
      </div>
    </div>
  );
}
