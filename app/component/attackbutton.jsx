"use client";

import { useState, useRef, useEffect } from "react";
import DamageButton from "./damagebutton";
import ResultDisplay from "./resultdisplay";
import AdvantagePanel from "./advantagepanel";
import { useClickOutside } from "../lib/useclickoutside";
import { doCritic, doAdvantage, checkFailed } from "../lib/diceutils";

export default function AttackButton({ action }) {
	const [result, setResult] = useState({ total: 0, dices: [] });
	const [advantage, setAdvantage] = useState(0);
	const [showAdvantagePanel, setShowAdvantagePanel] = useState(false);
	const [isCritic, setIsCritic] = useState(false);
	const [isFailed, setIsFailed] = useState(false);
	const panelRef = useRef(null);

  	useClickOutside(
    	panelRef,
    	() => setShowAdvantagePanel(false),
    	showAdvantagePanel
  	);

	function throwDice(diceProperty) {
		setIsCritic(false);
		setIsFailed(false);
		let allResultDices = [];

		const advantageAbsolute = Math.abs(advantage);
		const allResultDicesToRoll = diceProperty.numberDice + advantageAbsolute;

		for (let i = 0; i < allResultDicesToRoll; i++) {
			allResultDices.push(
				Math.floor(Math.random() * diceProperty.valueDice) + 1
			);
		}

		allResultDices = doAdvantage(advantageAbsolute, allResultDices, advantage);
		allResultDices = doCritic(
		allResultDices,
		allResultDices[0],
		diceProperty.valueDice,
		() => setIsCritic(true)
		);

		checkFailed(allResultDices, () => setIsFailed(true));

		let totalDices = allResultDices.reduce((acc, val) => acc + val, 0);
		let totalDicesWithBonus =
		parseInt(totalDices) + parseInt(diceProperty.bonus);
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

		<ResultDisplay
			resultToDisplay={result}
			isCritic={isCritic}
			isFailed={isFailed}
			diceProperties={action.dice}
		/>
		</div>
	);
}
