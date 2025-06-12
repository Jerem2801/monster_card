"use client";

import { useState, useRef} from "react";
import ActionButton from "./ActionButton";
import ResultDisplay from "../../resultdisplay";
import AdvantagePanel from "../../advantagepanel";
import { useClickOutside } from "../../../lib/useclickoutside";
import { doCritic, doAdvantage, checkFailed } from "../../../lib/diceutils";

export default function AttackButton({ action }) {
	const [result, setResult] = useState({ total: 0, dices: [] });

	const [advantage, setAdvantage] = useState(0);
	const [isCritic, setIsCritic] = useState(false);
	const [isFailed, setIsFailed] = useState(false);

	const [showAdvantagePanel, setShowAdvantagePanel] = useState(false);
	const panelRef = useRef(null);

	

  	useClickOutside(
    	panelRef,
    	() => setShowAdvantagePanel(false),
    	showAdvantagePanel
  	);

	function toggleAdvantagePanel() {
		setShowAdvantagePanel((prev) => !prev);
	}

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



	return (
		<div className="relative inline-block">
			<ActionButton
				handleClick={toggleAdvantagePanel}
				action={action}
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
