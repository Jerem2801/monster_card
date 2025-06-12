'use client'

import { useState, useRef, useEffect } from 'react';
import DamageButton from './damagebutton';
import ResultDisplay from './resultdisplay';
import AdvantagePanel from './advantagepanel';

export default function AttackButton({ action }) {
  const [result, setResult] = useState({ total: 0, dices: [] });
  const [advantage, setAdvantage] = useState(0);
  const [showAdvantagePanel, setShowAdvantagePanel] = useState(false);
  const [isCritic, setIsCritic] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowAdvantagePanel(false);
      }
    }
    if (showAdvantagePanel) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAdvantagePanel]);

  function shuffle(allResultDices) {
    allResultDices.sort(() => Math.random() - 0.5);
  }

  function doCritic(allResultDices, firstResult, valueDice) {
    if (firstResult == valueDice) {
      setIsCritic(true);
      const newValue = Math.floor(Math.random() * valueDice) + 1;
      allResultDices.push(newValue);
      doCritic(allResultDices, newValue, valueDice);
    }
    return allResultDices;
  }

  function doAdvantage(advantageAbsolute, allResultDices, advantage) {
    if (advantageAbsolute !== 0) {
      allResultDices.sort((a, b) => a - b);

      for (let i = 0; i < advantageAbsolute; i++) {
        if (advantage > 0) {
          allResultDices.shift();
        } else if (advantage < 0) {
          allResultDices.pop();
        }
      }
      shuffle(allResultDices);
    }
    return allResultDices;
  }

  function checkfailed(allResultDices) {
    if (allResultDices[0] == 1) setIsFailed(true); 
  }

  function throwDice(diceProperty) {
    setIsCritic(false);
    setIsFailed(false);
    let allResultDices = [];

    const advantageAbsolute = Math.abs(advantage);
    const allResultDicesToRoll = diceProperty.numberDice + advantageAbsolute;

    for (let i = 0; i < allResultDicesToRoll; i++) {
      allResultDices.push(Math.floor(Math.random() * diceProperty.valueDice) + 1);
    }

    allResultDices = doAdvantage(advantageAbsolute, allResultDices, advantage);
    allResultDices = doCritic(allResultDices, allResultDices[0], diceProperty.valueDice);

    let totalDices = allResultDices.reduce((accumulateur, valeurCourante) => accumulateur + valeurCourante, 0);
    checkfailed(allResultDices);
    let totalDicesWithBonus = parseInt(totalDices) + parseInt(diceProperty.bonus);
    setResult({ total: totalDicesWithBonus, dices: allResultDices });
    setShowAdvantagePanel(false);
    setAdvantage(0);
  }

  function toggleAdvantagePanel() {
    setShowAdvantagePanel((prev) => !prev);
  }

  return (
    <div className="relative inline-block">
      <DamageButton
        handleClick={toggleAdvantagePanel}
        name={action.name}
        description={action.description}
        dice={action.dice}
      />

      {showAdvantagePanel && (
        <div ref={panelRef}>
          <AdvantagePanel
            advantage={advantage}
            setAdvantage={setAdvantage}
            onThrowDice={() => throwDice(action.dice)}
          />
        </div>
      )}

      <ResultDisplay resultToDisplay={result} isCritic={isCritic} isFailed={isFailed} diceProperties={action.dice} />
    </div>
  );
}
