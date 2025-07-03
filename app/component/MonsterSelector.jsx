'use client'

import {useState} from "react";

export default function MonsterSelector({dataMonsters,addMonster,removeAll}){
    const [selectedMonsterName, setSelectedMonsterName] = useState(dataMonsters[0]?.name || '');

    function addMonsterToPanel(){
        const selected = dataMonsters.find((m) => m.name === selectedMonsterName);
        if (!selected){
            return
        }else{
            addMonster(selected);
        } 
    }

    return (
        <div className="w-full inline-flex items-center justify-center space-x-4 p-4 bg-gray-100">

            <div className="inline-block text-center mr-50">
                <p className="text-l font-bold">MONSTER CARDS</p>
                <p className="bg-blue-300 text-black text-xs px-2  mt-1">
                    BETA
                </p>
            </div>

            <select
                id="monster-select"
                className="min-w-[10rem] px-3 py-2 border border-gray-400 bg-white rounded-md focus:outline-none"
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
                className="px-5 py-2 rounded-md bg-white border-2 border-green-600
             hover:text-green-400 hover:border-green-400 text-green-600
             font-semibold transition-all duration-150 ease-in-out
             whitespace-nowrap cursor-pointer
             active:scale-95 active:bg-green-50"
                onClick={() => addMonsterToPanel()}
            >
                Ajouter
            </button>

            <button
                className="px-5 py-2 rounded-md bg-white border-2 border-red-600 hover:text-red-400 hover:border-red-400 text-red-600 font-semibold transition-colors whitespace-nowrap cursor-pointer"
                onClick={removeAll}
            >
                Nettoyer
            </button>
        </div>
    );
}