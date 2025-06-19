'use client'

import MonsterCard from './component/monster-card/MonsterCard';
import { dataMonsters } from './data/monsterdata';
import { useState } from 'react';

export default function Home() {

    const [monsters, setMonsters] = useState([]);
    const [selectedMonsterName, setSelectedMonsterName] = useState(dataMonsters[0]?.name || '');

    function addMonster(){
        const selected = dataMonsters.find((m) => m.name === selectedMonsterName);
        if (!selected) return;

        const id = crypto.randomUUID();
        setMonsters([...monsters, { id, monster: selected }]);
    }

    function removeMonster(idToRemove){
        setMonsters(monsters.filter(monster => monster.id !== idToRemove)); 
    }

    function removeAll(){
        setMonsters([]); 
    }


    return (
        <div className="p-4 space-y-4">

            <div className="inline-flex items-center space-x-4 p-6 rounded-lg border border-neutral-200 bg-white shadow-md">

                <select
                  id="monster-select"
                  className="min-w-[10rem] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
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
                  className="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors whitespace-nowrap cursor-pointer"
                  onClick={addMonster}
                >
                    Ajouter
                </button>

                <button
                  className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors whitespace-nowrap cursor-pointer"
                  onClick={removeAll}
                >
                    Nettoyer
                </button>

            </div>

            <div className="flex flex-col space-y-4">
                {monsters.map(({ id, monster }) => (
                    <MonsterCard key={id} monster={monster} remove={() => removeMonster(id)} />
                ))}
            </div>

        </div>

    );
}
