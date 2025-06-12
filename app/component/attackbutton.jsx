'use client'

import DamageButton from './damagebutton';
import AdvantageButton from './advantagebutton';
import ResultDisplay from './resultdisplay';
import { useState } from 'react';

export default function AttackButton({action}) {


  const [result, setResult] = useState({total:0,dices:[]});
  const [advantage, setAdvantage] = useState(0);

  function shuffle(allResultDices) {
    allResultDices.sort(() => Math.random() - 0.5);
  }

  function doCritic(allResultDices,firstResult,valueDice){
    if(firstResult == valueDice){
      const newValue = Math.floor(Math.random() * valueDice) + 1;
      allResultDices.push(newValue);
      doCritic(allResultDices,newValue,valueDice);
    }
    return allResultDices;
  }

  function doAdvantage(advantageAbsolute,allResultDices,advantage){
    if(advantageAbsolute != 0){
      allResultDices.sort((a, b) => a - b);
    
      for(let i = 0; i < advantageAbsolute; i++){
        if(advantage > 0){
          allResultDices.shift();
        }else if (advantage < 0){
          allResultDices.pop();
        }
      }  
      shuffle(allResultDices);
    }
    return allResultDices;
  }

  function throwDice(diceProperty){
    let allResultDices = [];

    const advantageAbsolute = Math.abs(advantage);
    const allResultDicesToRoll = diceProperty.numberDice+advantageAbsolute;

    for(let i = 0; i < allResultDicesToRoll; i++){
      allResultDices.push(Math.floor(Math.random() * diceProperty.valueDice) + 1);
    }

    allResultDices = doAdvantage(advantageAbsolute,allResultDices,advantage);
    allResultDices = doCritic(allResultDices,allResultDices[0],diceProperty.valueDice);

    
    let totalDices = allResultDices.reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante, 0);
    let totalDicesWithBonus = parseInt(totalDices)+parseInt(diceProperty.bonus); 
    setResult({total:totalDicesWithBonus,dices:allResultDices});
  }

  function addAdvantage(){
    return setAdvantage(advantage + 1);
  }

  function removeAdvantage(){
    return setAdvantage(advantage - 1);
  }

  return (
    <div>
        <DamageButton handleClick={throwDice} name={action.name} description={action.description} dice={action.dice}/>
        <AdvantageButton remove={removeAdvantage} add={addAdvantage} advantage={advantage} />
        <ResultDisplay resultToDisplay={result}/>      
    </div>
  );
}  