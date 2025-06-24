'use client'

import MonsterCard from './component/monster-card/MonsterCard';
import MonsterSelector from './component/MonsterSelector';
import { dataMonsters } from './data/monsterdata';
import { useState } from 'react';

export default function Home() {

    const [monsters, setMonsters] = useState([]);

    function addMonster(selectedMonster){
        const id = crypto.randomUUID();
        setMonsters([...monsters, { id, monster: selectedMonster }]);
    }

    function removeMonster(idToRemove){
        setMonsters(monsters.filter(monster => monster.id !== idToRemove)); 
    }

    function removeAllMonster(){
        setMonsters([]); 
    }


    return (
        <div className="">
            <MonsterSelector dataMonsters={dataMonsters} addMonster={addMonster} removeAll={removeAllMonster}/>

            <div className="flex flex-wrap justify-center gap-10 pt-8">
                {monsters.map(({ id, monster }) => (
                    <MonsterCard key={id} monster={monster} removeMonsterCard={() => removeMonster(id)} />
                ))}
            </div>

        </div>

    );
}
