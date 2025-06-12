'use client'

import AttackButton from './attackbutton';
import HealButton from './healbutton';
import { useState } from 'react';


export default function MonsterCard({monster, remove}){
	const [currentHp,setCurrentHp] = useState(monster.hp);
	console.log(monster);
	function addHeal(){
	    let newHp = currentHp + 1;
	    if(newHp > monster.hp){
	      newHp = currentHp;
	    }
	    return setCurrentHp(newHp);
	}

    function removeHeal(){
    	let newHp = currentHp - 1;
    	if(newHp < 0){
      		newHp = currentHp;
    	}
    	return setCurrentHp(newHp);
  	}

  return (
	<div className="rounded-lg p-4 shadow-md w-full max-w-md space-y-3 border"
		  	style={{
		    backgroundColor: 'rgb(242, 235, 218)',
		    borderColor: 'rgb(85, 85, 85)',
		    borderWidth: '1px',
		}}>
	  	<button 
	    	onClick={remove} 
	    	className="float-right text-red-600 hover:text-red-800 font-bold text-xl focus:outline-none"
	    	aria-label="Remove Monster"
	  	>
	    	×
	  	</button>
	  	<div className="text-xl font-semibold italic">{monster.name}</div>
	  	<HealButton remove={removeHeal} add={addHeal} heal={currentHp} healMax={monster.hp} />
        {monster.action.map((action) => (
        	<AttackButton key={action.name} action={action}/>
      	))}
	  {/*<AttackButton diceProperty={monster.dice} />*/}
	</div>

    );
	
}