export function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

export function doCritic(allResultDices, firstResult, valueDice, onCritic) {
  if (firstResult === valueDice) {
    onCritic?.();
    const newValue = Math.floor(Math.random() * valueDice) + 1;
    allResultDices.push(newValue);
    doCritic(allResultDices, newValue, valueDice, onCritic);
  }
  return allResultDices;
}

export function doAdvantage(advantageAbsolute, allResultDices, advantage) {
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

export function checkFailed(allResultDices, onFailed) {
  if (allResultDices[0] === 1) {
    onFailed?.();
  }
}

export function throwDice(diceProperty, advantage) {
  let isCriticResult = false;
		let isFailedResult = false;
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
			() => { isCriticResult = true; }
		);

		checkFailed(allResultDices, () => { isFailedResult = true; });

		let totalDices = allResultDices.reduce((acc, val) => acc + val, 0);
		let totalDicesWithBonus =
			parseInt(totalDices) + parseInt(diceProperty.bonus);

		const resultDice = {
			type: isCriticResult ? 'critic' : isFailedResult ? 'failed' : 'normal',
			total: totalDicesWithBonus,
			dices: allResultDices,
			diceProperty: diceProperty
		};
    return resultDice;
}
