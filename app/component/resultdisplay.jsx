export default function ResultDisplay({resultToDisplay}){
	const result = resultToDisplay.total + " (" + resultToDisplay.dices.join(",") + ")";

	return (<div>{result}</div>);
}