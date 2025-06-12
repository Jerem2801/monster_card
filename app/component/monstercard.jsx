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
	<div className="rounded-lg bg-amber-50 p-4 shadow-md w-full max-w-md space-y-3 border border-neutral-700">

	  	<button 
	    	onClick={remove} 
	    	className="cursor-pointer float-right text-red-600 hover:text-red-800 font-bold text-3xl focus:outline-none"
	    	aria-label="Remove Monster"
	  	>
	    	×
	  	</button>

	  	<div className="flex items-baseline gap-2 flex-wrap">
			<div className="italic font-semibold text-xl flex flex-wrap">
			{monster.name.split(' ').map((word, index) => (
				<span key={index} className="mr-1 leading-none">
				<span className="text-2xl">{word.charAt(0)}</span>
				<span className="text-lg uppercase">{word.slice(1)}</span>
				</span>
			))}
			</div>

			<span className="text-gray-500 text-sm">
			Niv. {monster.level}
			</span>
		</div>
		{monster.passif && monster.passif.length > 0 && (
		<div className="bg-gray-300 p-2 rounded-sm max-w-md">
			{monster.passif.map(({ name, description }, index) => (
			<p key={index} className="mb-1 text-sm">
				<span className="font-bold">{name}</span> {description}
			</p>
			))}
		</div>
		)}


	  	
        {monster.action.map((action) => (
        	<AttackButton key={action.name} action={action}/>
      	))} 
		
		<HealButton remove={removeHeal} add={addHeal} heal={currentHp} healMax={monster.hp} />
	</div>

    );
	
}