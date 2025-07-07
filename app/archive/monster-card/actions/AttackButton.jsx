"use client";

import { useState, useRef} from "react";
import ActionButton from "./ActionButton";
import ResultDisplay from "./ResultDisplay";
import AdvantagePanel from "./AdvantagePanel";
import { throwDice} from "../../../lib/diceutils";

export default function AttackButton({ action }) {
	const [result, setResult] = useState({ type: '',
			total: 0,
			dices: [],
			diceProperty: {}});

	const [advantage, setAdvantage] = useState(0);
	const [showAdvantagePanel, setShowAdvantagePanel] = useState(false);
	const [showResult, setShowResult] = useState(true);
	const panelRef = useRef(null);

	function toggleAdvantagePanel() {
		setShowResult(false);
		setShowAdvantagePanel((prev) => !prev);
	}

	function getResult(diceProperty) {
		const resultDice = throwDice(diceProperty, advantage);

		setResult(resultDice);
		setShowResult(true); // Affiche le résultat à chaque nouveau lancer
		setShowAdvantagePanel(false);
		setAdvantage(0);
	}

	function closeAvantage(){
		setShowAdvantagePanel((prev) => !prev);
		setAdvantage(0);
	}

	function handleHideResult() {
		setShowResult(false);
	}



	return (
		<div >
			<ActionButton
				handleClick={toggleAdvantagePanel}
				action={action}
			/>

			{showAdvantagePanel && (
				<div ref={panelRef}>
					<AdvantagePanel
						advantage={advantage}
						setAdvantage={setAdvantage}
						onThrowDice={() => getResult(action.dice)}
						closeWindows={closeAvantage}
						diceProperty={action.dice}
					/>
				</div>
			)}

			{showResult && (
				<ResultDisplay
					resultToDisplay={result}
					onHide={handleHideResult}
				/>
			)}
		</div>
	);
}
