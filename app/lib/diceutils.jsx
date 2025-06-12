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
